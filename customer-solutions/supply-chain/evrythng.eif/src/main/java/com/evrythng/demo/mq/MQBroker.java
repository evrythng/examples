package com.evrythng.demo.mq;

import org.apache.activemq.broker.BrokerService;

/**
 *
 */
public class MQBroker implements Runnable {
    @Override
    public void run() {
        BrokerService broker = new BrokerService();
        try {
            broker.addConnector("tcp://localhost:61616");
            broker.start();
        } catch (Exception e) {
            throw new RuntimeException("Unable to start ActiveMQ Broker", e);
        }
    }
}
