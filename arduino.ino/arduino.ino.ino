#include <SoftwareSerial.h>
#include <Servo.h>

//Humidity Sensor:
#include <dht.h>

dht DHT;

#define DHT11_PIN 7

//Parallax RFID Reader 
#define RFIDEnablePin 2 //Pin that enables reading. Set as OUTPUT and LOW to read an RFID tag
#define RFIDSerialRate 2400 //Parallax RFID Reader Serial Port Speed

//Using SoftwareSerial Library to locate the serial pins off the default set
//This allows the Arduino to be updated via USB with no conflict
#define RxPin 5 //Pin to read data from Reader 
#define TxPin 4 //Pin to write data to the Reader NOTE: The reader doesn't get written to, don't connect this line.
SoftwareSerial RFIDReader(RxPin,TxPin);

String RFIDTAG=""; //Holds the RFID Code read from a tag
String DisplayTAG = ""; //Holds the last displayed RFID Tag
Servo myservo;
int pos = 0;
int LDR = 0;
 
void setup() 
{
  pinMode(13, OUTPUT);
  // RFID reader SOUT pin connected to Serial RX pin at 2400bps
  RFIDReader.begin(RFIDSerialRate);
   //Photoresistor setup
   pinMode(LDR, INPUT);

  // Set Enable pin as OUTPUT to connect it to the RFID /ENABLE pin
  pinMode(RFIDEnablePin,OUTPUT); 

  // Activate the RFID reader
  // Setting the RFIDEnablePin HIGH will deactivate the reader
  // which could be usefull if you wanted to save battery life for
  // example.
  digitalWrite(RFIDEnablePin, LOW);

  Serial.begin(9600);           // set up Serial library at 9600 bps

  Serial.println("Reading from Arduino");  // prints hello with ending line break 

  //Servo setup
  myservo.attach(9);
 
}

void loop() 
{
   digitalWrite(13, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(100);              // wait for a second
  digitalWrite(13, LOW);    // turn the LED off by making the voltage LOW
  delay(0); 
  if(RFIDReader.available() > 0) // If data available from reader
  { 
    ReadSerial(RFIDTAG);  //Read the tag number from the reader. Should return a 10 digit serial number
  }

  //This only displays a tag once, unless another tag is scanned
  if(DisplayTAG!=RFIDTAG)
  {
    DisplayTAG=RFIDTAG;
    Serial.print("Tag= ");
    Serial.println(RFIDTAG);
  }
//  //For servo
//  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
////     in steps of 1 degree
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(2);                       // waits 15ms for the servo to reach the position
//  }
//  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(2);                       // waits 15ms for the servo to reach the position
//  }
int v = analogRead(LDR);
   Serial.print("Voltage= ");
   Serial.println(v);
   delay(1000);
 //For temperature and humidity sensor
  int chk = DHT.read11(DHT11_PIN);
  Serial.print("Temperature = ");
  Serial.println(DHT.temperature);
  Serial.print("Humidity = ");
  Serial.println(DHT.humidity);
  delay(1000);  
}

void ReadSerial(String &ReadTagString)
{
  int bytesread = 0;
  int  val = 0; 
  char code[10];
  String TagCode="";

  if(RFIDReader.available() > 0) {          // If data available from reader 
    if((val = RFIDReader.read()) == 10) {   // Check for header 
      bytesread = 0; 
      while(bytesread<10) {                 // Read 10 digit code 
        if( RFIDReader.available() > 0) { 
          val = RFIDReader.read(); 
          if((val == 10)||(val == 13)) {   // If header or stop bytes before the 10 digit reading 
            break;                         // Stop reading 
          } 
          code[bytesread] = val;           // Add the digit           
          bytesread++;                     // Ready to read next digit  
        } 
      } 
      if(bytesread == 10) {                // If 10 digit read is complete 
        myservo.write(pos);
        for(int x=0;x<10;x++)              //Copy the Chars to a String
        {
          TagCode += code[x];
        }
        ReadTagString = TagCode;          //Update the caller
        while(RFIDReader.available() > 0) //Burn off any characters still in the buffer
        {
          RFIDReader.read();
        } 

      } 
      bytesread = 0;
      TagCode="";
    } 
  } 
}



