package org.schema.identifier;

import javax.xml.bind.annotation.*;

/**
 * The GTIN-13 code of the product, or the product to which the offer refers.
 * This is equivalent to 13-digit ISBN codes and EAN UCC-13. Former 12-digit UPC codes can be converted into a GTIN-13 code by simply adding a preceeding zero.
 *
 * http://schema.org/gtin13
 *
 * GTIN - https://www.gtin.info/
 *
 */
public class GTIN13 {

    private String gtin;

    @XmlValue
    public String getValue() {
        return gtin;
    }

    public void setValue(String value) {
        if (value != null && value.matches("[0-9]{13}")) {
            this.gtin = value;
        } else {
            throw new IllegalArgumentException(value);
        }
    }

    /* For JAXB */
    public GTIN13() {};

    public GTIN13(String value) {
        this.setValue(value);
    };

    @Override
    public String toString() {
        return gtin;
    }
}
