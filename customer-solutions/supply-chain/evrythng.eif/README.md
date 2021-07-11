# Evrythng Enterprise Integration Framework

Reference implementation.

See [evrythng/examples](https://github.com/evrythng/examples/tree/master/customer-solutions/supply-chain)

# Pipelines

## GS1 XML Product Loader

See [XMLProductsLoaderPipeline.java](src/main/java/com/evrythng/demo/supplychain/XMLProductsLoaderPipeline.java). This pipeline:

1. reads a products.xml file dropped in [src/data](src/data) folder
2. converts GS1 Product to EVT Product - [ProductProcessor.java](src/main/java/com/evrythng/demo/supplychain/products/ProductProcessor.java)
3. attempts to load the products into EVT using the Evrythng Camel Component
4. products that fail to load are put in the persisted retry queue and retried after 2 seconds

The pipeline loads products in parallel by specifying multiple consumers of the products queue `seda://products-xml?concurrentConsumers=4`

## Durability

The pipeline uses persistent [ActiveMQ queues](http://activemq.apache.org/) in order to store the intermediate steps of a messages journey through the pipeline. If you stop the Pipeline during execution and restart it, pending messages from the previous run will complete.

Use the script [clear_queues.sh](clear_queues.sh) to clear out the previous messages.

## Connectivity with EVRYTHNG

We have started the implementation of the [EVRYTHNG Camel Component](http://camel.apache.org/writing-components.html) which is a wrapper around the [EVRYTHNG Java SDK](https://github.com/evrythng/evrythng-java-sdk) - see the `com.evrythng.camel` package. Only creating Products are implemented.

Example - reading Products and writing to EVRYTHNG:

```java
from("activemq:products")
  .to("evrythng:products")
  .errorHandler(deadLetterChannel(retryQueue));
```

The destination of the EVRYTHNG API is currently controlled with environment variables. It would be possible to extend this to set a dynamic endpoint in the route. For example:

```java
from("activemq:products")
  .to("evrythng:TRUSTEDAPPKEY@api-eu.evrythng.com/products")
```

This would allow us to create a pipeline between different API regions or accounts.

# Local install

When running locally:

## Build

Install Java and the [Gradle build tool](https://gradle.org/). On a Mac with [homebrew](https://brew.sh/):

    brew cask install java
    brew install gradle

On Ubuntu:  (note you need jdk for gradle, not jre!)

    sudo apt-get -y install openjdk-8-jdk-headless gradle

Checkout the repository and build

    git clone https://github.com/evrythng/examples.git

    cd examples/customer-solutions/supply-chain/evrythng.eif
    gradle clean build

This will make a JAR file containing all dependencies:

    build/libs/eif-0.18.70.jar

## Run

There are two mandatory environment variables:

    export EVT_URL=https://api-eu.evrythng.com
    export EVT_KEY=TRUSTEDAPPKEY

It is not recommended to run with your Operator key, a trusted application key is all that is required for most interactions.

The application will run and await XML files to be dropped into the `src/data` folder. See [dropfile.sh](dropfile.sh) script for example of how to trigger a load:

    java -jar build/libs/eif-0.18.*.jar

When running in Ubuntu we serialize objects to queues and we need to tell ActiveMQ [which objects we trust](http://activemq.apache.org/objectmessage.html). Use the [run_pipeline.sh script](run_pipeline.sh) when running on a server.

## Data

Sample products can be dropped into the pipeline:

    cp src/test/resources/schema.org/apparel.xml src/data

There is a [ruby script](src/main/ruby/gen_products.rb) to generate GS1 Product xml files. See the header of the script for install instructions.

Once the pipeline is running (see above) you can generate and load products with the script:

    ./drop_products.sh

Or generate products to a new file:

    ./gen_products.sh 1000 > /tmp/products.xml

To stop the pipeline,

    pkill -9 java

## Logging

The log entries logging token can be found in [logback.xml](src/main/resources/logback.xml)

# AMI

The steps required to make an Amazon Machine Image are:

## 1 Launch a new instance to form a template

* OS - Ubuntu 16.04 LTS
* t2.medium or an instance type with multiple cores
* create and download new key pair called `eif.pem`

## 2 SSH into the new machine with the keypair

    chmod 600 eif.pem
    ssh -i eif.pem ubuntu@ec2...

## 3 Install Java JDK and Gradle

    sudo apt-get -y install openjdk-8-jdk-headless gradle git

## 4 Download the reference implementation

    git clone https://github.com/evrythng/examples.git

    cd examples

During development only, switch to branch:

    git checkout reference-imp-eif

Build:

    cd customer-solutions/supply-chain/evrythng.eif
    gradle clean build

To run:

    ./run_pipeline.sh &

To stop:

    pkill -9 java


## 5 Build the AMI

From the AWS console, go to EC2 and running Instances.

* Select your instance
* Actions, Image, Create Image
* name it 'evrythng-eif'

Wait a few minutes for it to build

## 6 Launch new instance based on AMI

From the AWS console, go to EC2 and AMIs in LHS menu.

* Select your AMI 'evrythng-eif'
* Launch
* Select spot pricing to save money
* Choose instance type with say 4 vCPU *t2.xlarge*
* Choose existing key-pair `eif.pem`

Once the machine is launched, SSH in to the new IP address and

    cd examples/customer-solutions/supply-chain/evrythng.eif
