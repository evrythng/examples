package com.evrythng.demo.supplychain;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.junit.Test;
import org.schema.Products;

public class ProductLoaderTest extends CamelTestSupport {

    @Test
    public void parseProductsXML() {
        MockEndpoint skus = getMockEndpoint("mock:skus-xml");
        skus.expectedMessageCount(2);
    }

    @Override
    protected RouteBuilder createRouteBuilder() throws Exception {
        return new RouteBuilder() {
            @Override
            public void configure() throws Exception {
                from("seda:input")
                        .split(xpath(Products.XPATH_PRODUCTS))
                        .unmarshal().jaxb(Products.CONTEXT_PATH)
                        .to("mock:skus-xml");
            }
        };
    }

}