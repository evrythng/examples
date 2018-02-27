package org.schema;

import org.apache.camel.builder.xml.Namespaces;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name="Products", namespace = "http://schema.org/Product")
public class Products {

    public static final Namespaces ns = new Namespaces("p", "http://schema.org/Product");

    public static final String CONTEXT_PATH = Products.class.getPackage().getName();

    public static final String XPATH_PRODUCTS = "//p:Products/p:Product";

    @XmlElement(name="Product")
    List<Product> products;

}
