package com.evrythng.demo.supplychain.products;

import com.evrythng.demo.supplychain.EVTLoader;
import com.evrythng.java.wrapper.service.ProductService;
import com.evrythng.thng.resource.model.store.Product;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductLoader implements Processor {

    public ProductLoader() {
        this.productService = EVTLoader.newApiManager().productService();
    }

    private final ProductService productService;

    @Override
    public void process(Exchange exchange) throws Exception {
        Product product = exchange.getIn().getMandatoryBody(Product.class);
        product = productService.productCreator(product).execute();
        // TODO wrap in Circuit breaker
        logger.info(new JSONObject()
                .put("evt_id", product.getId())
                .put("identifiers", product.getIdentifiers()).toString());
    }

    private static Logger logger = LoggerFactory.getLogger("logentries");
}
