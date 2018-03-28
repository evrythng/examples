package com.evrythng.camel;

import com.evrythng.demo.supplychain.EVTLoader;
import com.evrythng.java.wrapper.ApiManager;
import org.apache.camel.Endpoint;
import org.apache.camel.impl.DefaultComponent;

import java.util.Map;

public class EvrythngComponent extends DefaultComponent {

    public EvrythngComponent() {
        super();
        this.api = EVTLoader.newApiManager();
    }

    private final ApiManager api;

    @Override
    public Endpoint createEndpoint(String uri) throws Exception {
        return new EvrythngEndpoint(uri, this.api);
    }

    @Override
    protected Endpoint createEndpoint(String uri, String remaining, Map<String, Object> parameters) throws Exception {
        return createEndpoint(uri);
    }

}
