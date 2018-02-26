package org.schema;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name="Products", namespace = "http://schema.org/Product")
public class Products {

    @XmlElement(name="Product")
    List<Product> products;

}
