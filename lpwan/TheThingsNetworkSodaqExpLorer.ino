#include <Sodaq_RN2483.h>
#include <CayenneLPP.h>
#define debugSerial SerialUSB
#define loraSerial Serial2

bool OTAA = true;

const uint8_t devAddr[4] =
{
  0x00,0x00,0x00,0x00
};

const uint8_t appSKey[16] =
{
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00
};

const uint8_t nwkSKey[16] =
{
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00
};

const uint8_t DevEUI[8] =
{
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00
};

const uint8_t AppEUI[16] =
{
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00
};

const uint8_t AppKey[16] =
{
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00
};

void setup()
{
  while ((!debugSerial) && (millis() < 10000)) {
  }

  debugSerial.begin(57600);
  loraSerial.begin(LoRaBee.getDefaultBaudRate());
  setupLoRa();
}

void setupLoRa() {
  setupLoRaOTAA();
}

void setupLoRaOTAA() {
  debugSerial.println(LoRaBee.initOTA(loraSerial, DevEUI, AppEUI, AppKey, false));
  if (LoRaBee.initOTA(loraSerial, DevEUI, AppEUI, AppKey, false)){
    debugSerial.println("Network connection successful.");
  }else{
    debugSerial.println("Network connection failed!");
  }
}

CayenneLPP lpp(51);
float mVolts,temp;
void loop()
{
  mVolts = (float)analogRead(TEMP_SENSOR) * 3300.0 / 1023.0;
  temp = (mVolts - 500.0) / 10.0;
  lpp.reset();
  lpp.addTemperature(1, temp);

  switch (LoRaBee.send(1, lpp.getBuffer(), lpp.getSize()))
  {
    case NoError:
    debugSerial.println("Successful transmission.");
    break;
    case NoResponse:
    debugSerial.println("There was no response from the device.");
    break;
    case Timeout:
    debugSerial.println("Connection timed-out. Check your serial connection to the device! Sleeping for 20sec.");
    delay(20000);
    break;
    case PayloadSizeError:
    debugSerial.println("The size of the payload is greater than allowed. Transmission failed!");
    break;
    case InternalError:
    debugSerial.println("Oh No! This shouldn't happen. Something is really wrong! The program will reset the RN module.");
    setupLoRa();
    break;
    case Busy:
    debugSerial.println("The device is busy. Sleeping for 10 extra seconds.");
    delay(10000);
    break;
    case NetworkFatalError:
    debugSerial.println("There is a non-recoverable error with the network connection. The program will reset the RN module.");
    setupLoRa();
    break;
    case NotConnected:
    debugSerial.println("The device is not connected to the network. The program will reset the RN module.");
    setupLoRa();
    break;
    case NoAcknowledgment:
    debugSerial.println("There was no acknowledgment sent back!");
    break;
    default:
    break;
  }
  delay(10000);
}
