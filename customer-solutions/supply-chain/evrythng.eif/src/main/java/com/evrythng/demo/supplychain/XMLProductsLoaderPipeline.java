package com.evrythng.demo.supplychain;

import com.evrythng.demo.mq.MQBroker;
import com.evrythng.demo.supplychain.products.ProductProcessor;
import com.evrythng.demo.supplychain.products.UnreliableProductLoader;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.main.Main;
import org.schema.Products;

import java.time.Duration;

/**
 * Apache Camel Pipeline that reads GS1 Products XML file and
 * loads them as EVT Products.
 */
public class XMLProductsLoaderPipeline extends RouteBuilder implements Runnable {

    /* Number of EVRYTHNG writers */
    private static final int WRITER_THREADS = 4;

    private static final String queueType        = "activemq"; // [activemq|seda|sqs]
    private static final String productsXMLQueue = String.format("%s:%s", queueType, "products-xml");
    private static final String productsQueue    = String.format("%s:%s", queueType, "products");
    private static final String retryQueue       = String.format("%s:%s", queueType, "retry-products");

    @Override
    public void configure() throws Exception {
        from("file:src/data")
                .choice()
                    .when(xpath(String.format("namespace-uri(/*) = '%s'", Products.ns)))
                        .log("Received XML file containing Products")
                        .split(Products.namespaces.xpath(Products.XPATH_PRODUCTS))
                        .unmarshal().jaxb(Products.CONTEXT_PATH)
                        .to(productsXMLQueue)
                        .endChoice()
                    .otherwise()
                        .log("Ignoring file");

        // Transform GS1 Product to EVT Product, and throttle to 30 rps
        from(productsXMLQueue)
                .process(new ProductProcessor())
                .throttle(30)
                .asyncDelayed()
                .to(productsQueue);

        // Load
        from(fanOut(productsQueue, WRITER_THREADS))
                .process(new UnreliableProductLoader())
                .errorHandler(deadLetterChannel(retryQueue));

        // If any uploads fail, wait 2 seconds and send the message back to the loader
        from(fanOut(retryQueue))
                .log("RETRY")
                .delayer(Duration.ofSeconds(2).toMillis())
                .to(productsQueue);

        from("seda:xml-validation")
                .to("validator:/org/schema/gs1.products.xsd");
//                .onException(org.xml.sax.SAXParseException.class);
    }

    // Runner

    @Override
    public void run() {
        startMQBroker();
        startPipeline();
    }

    private void startPipeline() {
        Main main = new Main();
        main.addRouteBuilder(new XMLProductsLoaderPipeline());
        try {
            main.run(new String[] {});
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private void startMQBroker() {
        new Thread(new MQBroker()).start();
    }

    public static void main(String[] args) {
        new XMLProductsLoaderPipeline().run();
    }

    // Fan out

    // Run pipeline stage on all available cores
    private static String fanOut(String queue) {
        return fanOut(queue, threadCount());
    }

    private static String fanOut(String queue, int threads) {
        return String.format("%s?concurrentConsumers=%d", queue, threads);
    }

    // Number of cores available at runtime (between 4 and 32)
    private static int threadCount() {
        int p = Runtime.getRuntime().availableProcessors() * 2;
        return Math.max(1, Math.min(p, 32));
    }

}
