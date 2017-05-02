#include <Sodaq_RN2483.h>
#include "Arduino.h"

#define debugSerial SerialUSB
#define loraSerial Serial2

//set up the leds to display status codes

// set up the red LED
void RED() {
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_BLUE, HIGH);
}


// set up the green LED
void GREEN() {
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_BLUE, HIGH);
}


// set up the blue LED
void BLUE() {
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_BLUE, LOW);
}


// set up the off state
void OFF() {
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_BLUE, HIGH);
}


// Set up the device keys
const uint8_t devAddr[4] =
{
0x62,0xDF,0xE0,0xB1 
};

const uint8_t appSKey[16] =
{
0x61,0x05,0x5A,0x9D,0x24,0xE2,0xCD,0x35,0xA5,0x71,0x9E,0x24,0x07,0x6F,0xA4,0x57
};

const uint8_t nwkSKey[16] =
{
0x58,0x8B,0xC3,0x0E,0x1C,0x5E,0x03,0x8A,0xDE,0xD6,0x96,0x22,0xF9,0xD2,0x40,0x72
};



//Set up some values and labels to send
//int TempValue= 1111;
int HumidityValue= 7353;
int Counter=0 ;
char TempLabel[20]="T:";
char HumidityLabel[20]="H:";
char CounterLabel[20]="C:";
char PayloadToSend[30];
String StrToSend;

void setup()
{
//FIX HW ISSUE. STOP FLOAING PIN
pinMode(4, OUTPUT);
digitalWrite(4, LOW);
delay(100);
digitalWrite(4, HIGH);

//set up the LED output pins
//pinMode(LED_RED, OUTPUT);
pinMode(LED_GREEN, OUTPUT);
pinMode(LED_BLUE, OUTPUT);

//flash the LEDs Red, Green and Blue for one second each during startup five times and then turn the off
int startcount=5;
      while (startcount > 0)
      {
      RED();
      delay(1000);
      GREEN();
      delay(1000);
      BLUE();
      delay(1000);
      startcount = startcount-1;
      }
OFF();

  
while ((!debugSerial) && (millis() < 10000));
  
debugSerial.begin(57600);
loraSerial.begin(LoRaBee.getDefaultBaudRate());

if (LoRaBee.initABP(loraSerial, devAddr, appSKey, nwkSKey, false))
  {
    debugSerial.println("OTA Connection to the network was successful.");
      // flash the green LED 5 times if connection successful
      int connectflashcount=5;
      while (connectflashcount > 0)
      {
      GREEN();
      delay(200);
      OFF();
      delay(200);
      connectflashcount = connectflashcount-1;
      }
      
  }
  else
  {
    debugSerial.println("OTA Connection to the network failed!");
      // flash the red LED 10 times if connection failure
      int failureflashcount=10;
      while (failureflashcount > 0)
      {
      RED();
      delay(200);
      OFF();
      delay(200);
      failureflashcount = failureflashcount-1;
      }
  }
} 

void loop()
{
  // get the temperature
  float mVolts = (float)analogRead(TEMP_SENSOR) * 3300.0 / 1023.0;
  float TempValue = (mVolts - 500.0) / 10.0;
  // Construct the string to send
  StrToSend = String(CounterLabel) +String(Counter)+","+ String(TempLabel) + String(TempValue) +","+ String(HumidityLabel)+ String(HumidityValue);
  // Convert the string to a charactor array
  StrToSend.toCharArray(PayloadToSend, 30);
  // Send the payload
  switch (LoRaBee.send(1, (const uint8_t*)PayloadToSend, 30))
  {
    case NoError:
       debugSerial.println(PayloadToSend);
      debugSerial.println("Successful transmission.");
      // flash the blue LED 3 times if data sent OK
      BLUE();delay(200);OFF();delay(200);BLUE();delay(200);OFF();delay(200);BLUE();delay(200);OFF();delay(200);
      // wiat for 60 seconds
      debugSerial.println("Waiting for 60 seconds.");
      delay(60000);
      break;
    case NoResponse:
      debugSerial.println("There was no response from the device...");
      break;
    case Timeout:
      debugSerial.println("Connection timed-out. Check your serial connection to the device! Sleeping for 20sec.");
      delay(20000);
      break;
    case PayloadSizeError:
      debugSerial.println("The size of the payload is greater than allowed. Transmission failed!");
      break;
    case InternalError:
      debugSerial.println("Oh No! This shouldn't happen. Something is really wrong! Try restarting the device!\r\nThe program will now halt.");
      while (1) {};
      break;
    case Busy:
      debugSerial.println("The device is busy. Sleeping for 10 extra seconds.");
      delay(10000);
      break;
    case NetworkFatalError:
      debugSerial.println("There is a non-recoverable error with the network connection. You should re-connect.\r\nThe program will now halt.");
      while (1) {};
      break;
    case NotConnected:
      debugSerial.println("The device is not connected to the network. Please connect to the network before attempting to send data.\r\nThe program will now halt.");
      while (1) {};
      break;
    case NoAcknowledgment:
      debugSerial.println("There was no acknowledgment sent back!");
      break;
    default:
      break;
  }
        // Increment our counter
        Counter++;
}
