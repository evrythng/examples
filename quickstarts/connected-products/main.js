/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
"use strict";

var EVT = require('evrythng-extended'),
    mqtt = require('evrythng-mqtt'),
    mraa = require('mraa');

EVT.use(mqtt);

var device = new EVT.Device({
    apiKey: "...",
    id: "..."
});

(function evtWashingMachineController(evtDevice) {
    var led = new mraa.Gpio(13);
    led.dir(mraa.DIR_OUT);
    evtDevice.property("ledStatus").update(led.read());
    evtDevice.action("_setLedStatus").subscribe(
        function (action) {
            led.write(action.customFields.status);
            evtDevice.property("ledStatus").update(action.customFields.status);
        });
})(device);