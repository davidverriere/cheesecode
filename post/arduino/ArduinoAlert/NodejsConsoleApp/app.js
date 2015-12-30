
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'votre consumer key',
	consumer_secret: 'votre consumer secret',
	access_token_key: 'votre access token key',
	access_token_secret: 'votr access token secret'
});


var serialport = require('serialport');

//à remplacer par votre nom de port COM
var portName = 'COM4';
var sp = new serialport.SerialPort(portName, {
	baudRate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false,
	parser: serialport.parsers.readline("\r\n")
});


//sur la reception de données depuis la liaison série, on transmet sur le socket du navigateur la valeur de la cellule
sp.on('data', function (input) {
	if (input === 'MVT') {
		client.post('direct_messages/new.json', {
			"screen_name": "runmygeek",
			"text": "Mouvement détecté"
		}, function (error, tweet, response) {
			if (error) {
				console.log(error);
			}
		});
	}
	console.log(input);
}); // Send data to client
