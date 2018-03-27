package com.evrythng.demo.supplychain;

import com.evrythng.demo.mq.MQBroker;
import com.evrythng.demo.supplychain.products.ProductProcessor;
import com.evrythng.demo.supplychain.products.UnreliableProductLoader;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.main.Main;
import org.schema.Products;

/**
 * Apache Camel Pipeline that reads GS1 Products XML file and
 * loads them as EVT Products.
 *
 * TODO convert EVT SDK into endpoint
 *      protect with throttling http://camel.apache.org/throttler.html
 */
public class XMLProductsLoaderPipeline extends RouteBuilder implements Runnable {

    /* Fan out with <code>seda:queue?concurrentConsumers=x</code> */
    private static final int WRITER_THREADS = 4;

    private static final String queueType        = "seda";
    private static final String productsXMLQueue = String.format("%s:%s", queueType, "products-xml");
    private static final String productsXMLQueueConsumer = String.format("%s?concurrentConsumers=%d", productsXMLQueue, WRITER_THREADS);

    @Override
    public void configure() throws Exception {
        from("file:src/data")
                .choice()
                    .when(xpath(String.format("namespace-uri(/*) = '%s'", Products.ns)))
                        .log("Received XML file containing Products")
                        .split(Products.namespaces.xpath(Products.XPATH_PRODUCTS))
                        .unmarshal().jaxb(Products.CONTEXT_PATH)
                        .to("activemq:products")
                        .endChoice()
                    .otherwise()
                        .log("Ignoring file");
        from("activemq:products")
                .throttle(30)
                .asyncDelayed()
                .to(productsXMLQueue);
        from(productsXMLQueueConsumer)
                .process(new ProductProcessor())
                .process(new UnreliableProductLoader())
                .errorHandler(deadLetterChannel("activemq:com.evrythng.retry"));
        from("activemq:com.evrythng.retry")
                .log("ERROR uploading Product to EVT")
                .delayer(4 * 1000)
                .to(productsXMLQueue);
        from("seda:xml-validation")
                .to("validator:/org/schema/gs1.products.xsd");
//                .onException(org.xml.sax.SAXParseException.class);
    }

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
}
