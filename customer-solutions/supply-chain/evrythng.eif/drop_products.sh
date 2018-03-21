#!/bin/bash

echo "Generate Products inside the Camel input pipeline folder"

TMP=`mktemp`

ruby src/main/ruby/gen_products.rb ${1:-100} > $TMP

mv $TMP src/data/products.xml
