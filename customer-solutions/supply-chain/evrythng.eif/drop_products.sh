#!/bin/bash

echo "Generate Products inside the Camel input pipeline folder"

ruby src/main/ruby/gen_products.rb ${1:-100} > src/data/products.xml
