package org.schema.identifier;

import org.junit.Test;

import static org.junit.Assert.*;

public class GTIN13Test {

    @Test
    public void testGTIN() {
        assertEquals("1234567890123", new GTIN13("1234567890123").gtin);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testShortGTIN() {
        new GTIN13("123456789012");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testLongGTIN() {
        new GTIN13("12345678901234");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNullGTIN() {
        new GTIN13(null);
    }

    @Test
    public void testToString() {
        assertEquals("1234567890123", new GTIN13("1234567890123").toString());
    }

}