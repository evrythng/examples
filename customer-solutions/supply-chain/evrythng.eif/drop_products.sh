#!/bin/bash

echo "Generate Products inside the Camel input pipeline folder"

# Generate to a temporary file, otherwise Camel will read a partial XML file
TMP=`mktemp`
ruby src/main/ruby/gen_products.rb ${1:-100} > $TMP

mv $TMP src/data/products.xml
