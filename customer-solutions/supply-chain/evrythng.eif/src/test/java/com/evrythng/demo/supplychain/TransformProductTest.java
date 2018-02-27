package com.evrythng.demo.supplychain;

import com.evrythng.demo.supplychain.products.TransformProduct;
import com.evrythng.thng.resource.model.store.Product;
import org.junit.Before;
import org.junit.Test;
import org.schema.identifier.GTIN13;

import static org.junit.Assert.*;

public class TransformProductTest {

    private Product evtProduct;

    @Before
    public void setUp() {
        org.schema.Product input = new org.schema.Product();
        input.name = "Glass";
        input.brand = "Glass Suppliers Ltd";
        input.description = "75 cl empty bottles";
        input.gtin13 = new GTIN13("8274659839027");
        input.additionalProperty.put("qty_per_pallet", 960);
        evtProduct = new TransformProduct().convert(input);
    }

    @Test
    public void testName() {
        assertEquals("Glass", evtProduct.getName());
    }

    @Test
    public void testDescription() {
        assertEquals("75 cl empty bottles", evtProduct.getDescription());
    }

    @Test
    public void testBrand() {
        assertEquals("Glass Suppliers Ltd", evtProduct.getBrand());
    }

    @Test
    public void testEAN() {
        assertEquals("8274659839027", evtProduct.getIdentifiers().get("EAN"));
    }

    @Test
    public void testQuantityPerPallet() {
        assertEquals(960, evtProduct.getCustomFields().get("qty_per_pallet"));
    }

}