package org.schema;

import org.schema.identifier.GTIN13;

import java.util.HashMap;
import java.util.Map;

/**
 * GS1 Product.
 *
 * https://www.gs1.org/voc/Product
 * http://schema.org/Product
 */
public class Product extends Thing {

    // EVRYTHNG/Product.brand
    public String brand;

    /**
     * A category for the item.
     * Greater signs or slashes can be used to informally indicate a category hierarchy.
     *
     * EVRYTHNG/Product.tags
     */
    public String category;

    // EVRYTHNG/Product.identifiers.EAN
    public GTIN13 gtin13;

    // EVRYTHNG/Product.customFields
    public Map<String, Number> additionalProperty = new HashMap<>();
}
