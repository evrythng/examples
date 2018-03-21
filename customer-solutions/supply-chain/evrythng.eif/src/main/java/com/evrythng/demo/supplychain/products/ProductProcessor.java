package com.evrythng.demo.supplychain.products;

import com.evrythng.thng.resource.model.store.Product;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.Processor;
import org.apache.camel.impl.DefaultMessage;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

/**
 * Convert gs1 Product -> evrythng.Product
 */
public class ProductProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        Optional<org.schema.Product> skuInfo = Optional.ofNullable(exchange.getIn().getBody(org.schema.Product.class));
        if (skuInfo.isPresent()) {
            TransformGS1ProductToEVTProduct transformProduct = new TransformGS1ProductToEVTProduct();
            Message message = new DefaultMessage();
            message.setBody(transformProduct.convert(skuInfo.get()));
            exchange.setOut(message);
        } else {
            throw new IllegalArgumentException("Not a SKU");
        }
    }

    /**
     * Transform GS1/Product to EVT/Product.
     */
    public static class TransformGS1ProductToEVTProduct {

        public TransformGS1ProductToEVTProduct() {
            this.target = new Product();
        }

        private final Product target;

        public Product convert(org.schema.Product src) {
            return this
                    .name(src)
                    .brand(src)
                    .description(src)
                    .gtin(src)
                    .additionalProperties(src)
                    .images(src)
                    .categories(src)
                    .toEVT();
        }

        private Product toEVT() {
            return this.target;
        }

        private TransformGS1ProductToEVTProduct name(org.schema.Product p) {
            if (p.name != null && !p.name.isEmpty()) {
                target.setName(p.name);
            } else {
                target.setName("Unnamed");
            }
            return this;
        }

        private TransformGS1ProductToEVTProduct brand(org.schema.Product p) {
            if (p.brand != null && !p.brand.isEmpty()) {
                target.setBrand(p.brand);
            }
            return this;
        }

        private TransformGS1ProductToEVTProduct description(org.schema.Product p) {
            if (p.description != null && !p.description.isEmpty()) {
                target.setDescription(p.description);
            }
            return this;
        }

        private TransformGS1ProductToEVTProduct gtin(org.schema.Product p) {
            if (p.toString() != null) {
                target.addIdentifier("EAN", p.gtin13.toString());
            }
            return this;
        }

        private TransformGS1ProductToEVTProduct additionalProperties(org.schema.Product p) {
            for (Map.Entry<String, Number> entry : p.additionalProperty.entrySet()) {
                target.addCustomFields(entry.getKey(), entry.getValue());
            }
            return this;
        }

        private TransformGS1ProductToEVTProduct images(org.schema.Product p) {
            if (p.image != null) {
                if (target.getPhotos() == null) {
                    target.setPhotos(new ArrayList<>());
                }
                target.getPhotos().add(p.image.toString());
            }
            return this;
        }

        private TransformGS1ProductToEVTProduct categories(org.schema.Product p) {
            if (p.category != null) {
                target.setTags(new ArrayList<>());
                for(String tag: p.category.trim().split("/")) {
                    target.getTags().add(tag);
                }
            }
            return this;
        }

    }
}
