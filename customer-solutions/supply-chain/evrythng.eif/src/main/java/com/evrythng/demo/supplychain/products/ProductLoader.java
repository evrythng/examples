package com.evrythng.demo.supplychain.products;

import com.evrythng.demo.supplychain.EVTLoader;
import com.evrythng.java.wrapper.service.ProductService;
import com.evrythng.thng.resource.model.store.Product;
import com.google.gson.Gson;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import java.util.logging.Logger;

public class ProductLoader implements Processor {

    public ProductLoader() {
        this.productService = EVTLoader.newApiManager().productService();
    }

    private final ProductService productService;

    @Override
    public void process(Exchange exchange) throws Exception {
        System.out.println("***** LOAD ******");
        Product product = exchange.getIn().getMandatoryBody(Product.class);
        product = productService.productCreator(product).execute();
        // TODO wrap in Circuit breaker
        logger.info(product.getId());
    }

    private static final Gson gson = new Gson();
    private static final Logger logger = Logger.getLogger(ProductLoader.class.getName());
}
