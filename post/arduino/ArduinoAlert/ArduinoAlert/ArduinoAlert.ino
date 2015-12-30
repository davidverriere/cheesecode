/*
 Name:		ArduinoAlert.ino
 Created:	12/30/2015 8:15:14 AM
 Author:	david_v
*/

int inputPin = 2;               // le num�ro de l'entr�e analogique ou la pate jaune du capteur est branch�e
int currentState = LOW;         
int val = 0;                    


void setup() {
	pinMode(inputPin, INPUT);
	// attention � la vitesse s�rie elle doit �tre identique sur le serveur nodejs
	Serial.begin(9600);
}


void loop() {

	val = digitalRead(inputPin);
	if (val == HIGH) {
		//le capteur d�tecte en ce moment un mouvement
		if (currentState == LOW) {
			// si on �tait pr�c�dement en �tat aucun mouvement, on envoie sur la liaison s�rie MVT
			Serial.println("MVT");
			currentState = HIGH;
		}
	}
	else
	{
		if (currentState == HIGH)
		{
			//il n'y a plus de mouvement d�tect� et on change d'�tat, on pr�vient le serveur
			Serial.println("NOMVT");
			currentState = LOW;
		}
	}
}
