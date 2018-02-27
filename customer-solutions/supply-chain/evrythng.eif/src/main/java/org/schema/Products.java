package org.schema;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name="Products", namespace = "http://schema.org/Product")
public class Products {

    public static final String CONTEXT_PATH = Products.class.getPackage().getName();

    public static final String XPATH_PRODUCTS = "//Products/Product";

    @XmlElement(name="Product")
    List<Product> products;

}
