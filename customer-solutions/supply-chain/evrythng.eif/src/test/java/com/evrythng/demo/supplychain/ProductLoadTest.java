package com.evrythng.demo.supplychain;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.junit.Test;
import org.schema.Products;

import static org.junit.Assert.*;

public class ProductLoadTest extends CamelTestSupport {

    @Test
    public void parseProductsXML() {
        MockEndpoint skus = getMockEndpoint("mock:skus-xml");
    }

    @Override
    protected RouteBuilder createRouteBuilder() throws Exception {
        return new RouteBuilder() {
            @Override
            public void configure() throws Exception {
                from("seda:input")
                        .split(xpath("//Products/Product"))
                        .unmarshal().jaxb("org.schema")
                        .to("mock:skus-xml");
            }
        };
    }

}