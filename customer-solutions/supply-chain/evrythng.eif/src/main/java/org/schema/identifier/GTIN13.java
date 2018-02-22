package org.schema.identifier;

import com.sun.istack.internal.NotNull;

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

    /**
     * Validates GTIN.
     *
     * @throws IllegalArgumentException if not 13 digits
     */
    public GTIN13(String s) {
        if (s != null && s.matches("[0-9]{13}")) {
            this.gtin = s;
        } else {
            throw new IllegalArgumentException(s);
        }
    }

    @NotNull
    public final String gtin;

    @Override
    public String toString() {
        return gtin;
    }
}