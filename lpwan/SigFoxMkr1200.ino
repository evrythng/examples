/*
  SigFox First Configuration

  This sketch demonstrates the usage of MKRFox1200 SigFox module.
  Since the board is designed with low power in mind, it depends directly on ArduinoLowPower library

  This example code is in the public domain.
*/

#include <SigFox.h>
#include <ArduinoLowPower.h>
void sendTemperature() {
  // Start the module
  SigFox.begin();
  // Wait at least 30mS after first configuration (100mS before)
  delay(1000);
  // Clears all pending interrupts
  
  SigFox.status();
  delay(1000);
  SigFox.beginPacket();
  uint8_t v= SigFox.internalTemperature();
  SigFox.write(v);

  int ret = SigFox.endPacket();  // send buffer to SIGFOX network
  SigFox.end();
}

void setup() {

  // Uncomment this line and comment begin() if you are working with a custom board
  //if (!SigFox.begin(SPI1, 30, 31, 33, 28, LED_BUILTIN)) {
  if (!SigFox.begin()) {
    return;
  }
  // Enable debug led and disable automatic deep sleep
  // Comment this line when shipping your project :)
SigFox.debug();

  delay(100);

  // Send the module to the deepest sleep
  SigFox.end();

}


void loop() {
  // Every 15 minutes, read all the sensors and send them
  // Let's try to optimize the data format
  // Only use floats as intermediate representaion, don't send them directly
sendTemperature();



  //Sleep for 20 minutes
  LowPower.sleep(20 * 60 * 1000);
}

