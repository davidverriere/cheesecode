/*
 Name:		ArduinoAlert.ino
 Created:	12/30/2015 8:15:14 AM
 Author:	david_v
*/

int inputPin = 2;               // le numéro de l'entrée analogique ou la pate jaune du capteur est branchée
int currentState = LOW;         
int val = 0;                    


void setup() {
	pinMode(inputPin, INPUT);
	// attention à la vitesse série elle doit être identique sur le serveur nodejs
	Serial.begin(9600);
}


void loop() {

	val = digitalRead(inputPin);
	if (val == HIGH) {
		//le capteur détecte en ce moment un mouvement
		if (currentState == LOW) {
			// si on était précédement en état aucun mouvement, on envoie sur la liaison série MVT
			Serial.println("MVT");
			currentState = HIGH;
		}
	}
	else
	{
		if (currentState == HIGH)
		{
			//il n'y a plus de mouvement détecté et on change d'état, on prévient le serveur
			Serial.println("NOMVT");
			currentState = LOW;
		}
	}
}
