package com.evrythng.demo.supplychain;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.main.Main;
import org.schema.Products;

public class ProductLoader extends RouteBuilder implements Runnable {

    @Override
    public void configure() throws Exception {

        from("file:src/data")
                .choice()
                    .when(xpath("namespace-uri(/*) = 'http://schema.org/Product'"))
                        .log("Received XML file containing Products")
                        .split(xpath(Products.XPATH_PRODUCTS))
                        .unmarshal().jaxb(Products.CONTEXT_PATH)
                        .to("seda:sku-xml")
                        .endChoice()
                    .otherwise()
                        .log("Ignoring file");
        from("seda:sku-xml")
                .log("Product!");
//                .process(new SKUtoProductProcessor())
//                .process(new ProductProcessor());

    }

    @Override
    public void run() {
        Main main = new Main();
        main.addRouteBuilder(new ProductLoader());
        try {
            main.run(new String[] {});
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public static void main(String[] args) {
        new ProductLoader().run();
    }
}
