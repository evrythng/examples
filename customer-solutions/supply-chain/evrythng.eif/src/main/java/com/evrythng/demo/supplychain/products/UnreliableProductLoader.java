package com.evrythng.demo.supplychain.products;

import com.evrythng.java.wrapper.exception.EvrythngClientException;
import org.apache.camel.Exchange;

import java.security.SecureRandom;
import java.util.Random;

/**
 * Fails to load products into EVT 50% of the time.
 */
public class UnreliableProductLoader extends ProductLoader {

    private final Random rnd = new SecureRandom();

    @Override
    public void process(Exchange exchange) throws Exception {
        if (platformTemporarilyOverloaded()) {
            throw new EvrythngClientException("504 Platform Temporarily Unavailable");
        } else {
            super.process(exchange);
        }
    }

    private boolean platformTemporarilyOverloaded() {
        return rnd.nextBoolean();
    }
}
