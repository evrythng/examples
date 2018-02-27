package com.evrythng.demo.supplychain.products;

import com.evrythng.thng.resource.model.store.Product;

import java.util.Map;

/**
 * Transform GS1/Product to EVT/Product.
 */
public class TransformProduct {

    public TransformProduct() {
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
                .toEVT();
    }

    private Product toEVT() {
        return this.target;
    }

    private TransformProduct name(org.schema.Product p) {
        if (p.name != null && !p.name.isEmpty()) {
            target.setName(p.name);
        } else {
            target.setName("Unnamed");
        }
        return this;
    }

    private TransformProduct brand(org.schema.Product p) {
        if (p.brand != null && !p.brand.isEmpty()) {
            target.setBrand(p.brand);
        }
        return this;
    }

    private TransformProduct description(org.schema.Product p) {
        if (p.description != null && !p.description.isEmpty()) {
            target.setDescription(p.description);
        }
        return this;
    }

    private TransformProduct gtin(org.schema.Product p) {
        if (p.gtin13 != null) {
            target.addIdentifier("EAN", p.gtin13.gtin);
        }
        return this;
    }

    private TransformProduct additionalProperties(org.schema.Product p) {
        for (Map.Entry<String, Number> entry : p.additionalProperty.entrySet()) {
            target.addCustomFields(entry.getKey(), entry.getValue());
        }
        return this;
    }

}
