/*
 Name:		arduinonode.ino
 Created:	12/28/2015 5:47:15 PM
 Author:	david_v
*/

#define CDS_INPUT 0

void setup() {
	Serial.begin(9600);
}

void loop() {

	int value = analogRead(CDS_INPUT);
	Serial.println(value);

	delay(1000);
}
