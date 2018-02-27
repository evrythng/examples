package com.evrythng.demo.supplychain;

import com.evrythng.java.wrapper.ApiManager;
import com.evrythng.thng.commons.config.ApiConfiguration;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Base class, EVT aware
 */
public abstract class EVTLoader {

    public static ApiManager newApiManager() {
        try {
            URL url = new URL(System.getenv("EVT_URL"));
            String EVT_KEY = System.getenv("EVT_KEY");
            ApiConfiguration apiConfiguration = new ApiConfiguration(EVT_KEY);
            apiConfiguration.setUrl(url.toString());
            return new ApiManager(apiConfiguration);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Malformed URL in ENV variable EVT_URL", e);
        }
    }
}
