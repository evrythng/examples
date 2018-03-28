package com.evrythng.camel;

import com.evrythng.java.wrapper.ApiManager;
import org.apache.camel.Consumer;
import org.apache.camel.Processor;
import org.apache.camel.Producer;
import org.apache.camel.impl.DefaultEndpoint;

public class EvrythngEndpoint extends DefaultEndpoint {

    public EvrythngEndpoint(String uri, ApiManager api) {
        super();
        this.api = api;
        this.uri = uri;
    }

    private final ApiManager api;
    private final String uri;

    @Override
    public String getEndpointUri() {
        return this.uri;
    }

    @Override
    public Producer createProducer() throws Exception {
        if (uri.endsWith("products")) {
            return new EvrythngProductProducer(this, api.productService());
        } else {
            throw new IllegalArgumentException(String.format("Unknown EVT resource '%s'", uri));
        }
    }

    @Override
    public Consumer createConsumer(Processor processor) throws Exception {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}
