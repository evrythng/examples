package com.evrythng.demo.supplychain.products;

import com.evrythng.demo.supplychain.EVTLoader;
import com.evrythng.java.wrapper.exception.EvrythngClientException;
import com.evrythng.java.wrapper.service.ProductService;
import com.evrythng.thng.resource.model.store.Product;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.json.JSONObject;

import java.security.SecureRandom;
import java.util.Random;
import java.util.logging.Logger;

public class UnreliableProductLoader implements Processor {

    public UnreliableProductLoader() {
        this.productService = EVTLoader.newApiManager().productService();
    }

    private final ProductService productService;

    private final Random rnd = new SecureRandom();

    @Override
    public void process(Exchange exchange) throws Exception {
        Product product = exchange.getIn().getMandatoryBody(Product.class);
        if (platformTemporarilyOverloaded()) {
            throw new EvrythngClientException("504 Platform Temporarily Unavailable");
        } else {
            product = productService.productCreator(product).execute();
            // TODO wrap in Circuit breaker
            logger.info(new JSONObject().put("evt_id", product.getId()).toString());
        }
    }

    private boolean platformTemporarilyOverloaded() {
        return rnd.nextBoolean();
    }

    private static final Logger logger = Logger.getLogger(UnreliableProductLoader.class.getName());
}
