package com.evrythng.demo.supplychain;

import com.evrythng.demo.supplychain.products.ProductLoader;
import com.evrythng.demo.supplychain.products.ProductProcessor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.main.Main;
import org.schema.Products;

public class ProductsLoader extends RouteBuilder implements Runnable {

    @Override
    public void configure() throws Exception {

        from("file:src/data")
                .choice()
                    .when(xpath("namespace-uri(/*) = 'http://schema.org/Product'"))
                        .log("Received XML file containing Products")
                        .split(Products.ns.xpath(Products.XPATH_PRODUCTS))
                        .unmarshal().jaxb(Products.CONTEXT_PATH)
                        .to("seda:sku-xml")
                        .endChoice()
                    .otherwise()
                        .log("Ignoring file");
        from("seda:sku-xml")
                .log("Product!")
                .process(new ProductProcessor())
                .process(new ProductLoader());

    }

    @Override
    public void run() {
        Main main = new Main();
        main.addRouteBuilder(new ProductsLoader());
        try {
            main.run(new String[] {});
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public static void main(String[] args) {
        new ProductsLoader().run();
    }
}
