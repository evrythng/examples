package com.evrythng.demo.supplychain;

import com.evrythng.thng.resource.model.store.Product;

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

}
