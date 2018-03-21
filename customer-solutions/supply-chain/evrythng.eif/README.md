# Evrythng Enterprise Integration Framework

Reference implementation.

See [evrythng/examples](https://github.com/evrythng/examples/tree/master/customer-solutions/supply-chain)

# Local install

When running locally:

## Build

Install Java and the [Gradle build tool](https://gradle.org/). On a Mac with [homebrew](https://brew.sh/):

    brew cask install java
    brew install gradle

Checkout the repository and build

    git clone git@github.com:evrythng/examples.git

    cd customer-solutions/supply-chain/evrythng.eif
    gradle clean build

This will make a JAR file containing all dependencies:

    build/libs/eif-0.18.70.jar

## Run

There are two mandatory environment variables:

    export EVT_URL=https://api-eu.evrythng.com
    export EVT_KEY=TRUSTEDAPPKEY

It is not recommended to run with your Operator key, a trusted application key is all that is required for most interactions.

    java -jar build/libs/eif-0.18.*.jar

The application will run and await XML files to be dropped into the `src/data` folder. See [dropfile.sh](dropfile.sh) script for example of how to trigger a load.

## Data

There is a [ruby script](src/main/ruby/gen_products.rb) to generate GS1 Product xml files. See the header of the script for install instructions.

Once the pipeline is running (see above) you can generate and load products with the script:

    ./drop_products.sh

Or generate products to a new file:

    ./gen_products.sh 1000 > /tmp/products.xml
