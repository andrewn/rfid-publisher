#include <SoftwareSerial.h> 

byte MF_GET_SNR[8] = {0xAA, 0x00, 0x03, 0x25, 0x26, 0x00, 0x00, 0xBB};

SoftwareSerial rfid(3, 4); // RX, TX

String id = String();

void setup()  
{
  Serial.begin(57600);
  rfid.begin(9600);
}

void loop()
{
  rfid.write(MF_GET_SNR, 8);
  
  delay(50);
  
  id = "";
  
  while(rfid.available() > 0) {
    String partial = String(rfid.read(), HEX);
    id = id + partial;
  }
  
  Serial.println(id);
}
