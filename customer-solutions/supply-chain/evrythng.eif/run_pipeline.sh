#!/bin/bash

# See http://activemq.apache.org/objectmessage.html
EVT_MODEL=com.evrythng.thng.resource.model.store,org.apache.commons.collections.list
SERIALIZABLE_PACKAGES=java.lang,javax.security,java.util,org.apache.activemq,org.fusesource.hawtbuf,$EVT_MODEL

JAR=`find build/libs/eif-0.18.*.jar | head -n 1`

java -Dorg.apache.activemq.SERIALIZABLE_PACKAGES=$SERIALIZABLE_PACKAGES -jar $JAR &
