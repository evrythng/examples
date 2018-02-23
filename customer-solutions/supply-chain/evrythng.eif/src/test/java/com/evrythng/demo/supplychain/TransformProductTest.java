package com.evrythng.demo.supplychain;

import com.evrythng.thng.resource.model.store.Product;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class TransformProductTest {

    private Product evtProduct;

    @Before
    public void setUp() {
        evtProduct = new TransformProduct().convert(new org.schema.Product());
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
        assertEquals("82746598390275638", evtProduct.getIdentifiers().get("EAN"));
    }

    @Test
    public void testQuantityPerPallet() {
        assertEquals(960, evtProduct.getCustomFields().get("qty_per_pallet"));
    }

}