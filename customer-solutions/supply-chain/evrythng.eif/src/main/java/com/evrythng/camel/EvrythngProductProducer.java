package com.evrythng.camel;

import com.evrythng.java.wrapper.service.ProductService;
import com.evrythng.thng.resource.model.store.Product;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.impl.DefaultProducer;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EvrythngProductProducer extends DefaultProducer {

    EvrythngProductProducer(Endpoint endpoint, ProductService productService) {
        super(endpoint);
        this.productService = productService;
    }

    private final ProductService productService;

    @Override
    public void process(Exchange exchange) throws Exception {
        try {
            Product product = exchange.getIn().getMandatoryBody(Product.class);
            product = productService.productCreator(product).execute();
            logProduct(product);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    private void logProduct(Product product) {
        logger.info(new JSONObject()
                .put("evt_id", product.getId())
                .put("identifiers", product.getIdentifiers())
                .toString());
    }

    private static Logger logger = LoggerFactory.getLogger("load");
}
