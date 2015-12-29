
//initialisation de la socket de communication avec le navigateur sur le port 8001
var io = require('socket.io').listen(8001); 
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

//à la connection d'un client on lui répond hello
io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' }); 
	
	//sur la reception de données depuis la liaison série, on transmet sur le socket du navigateur la valeur de la cellule
	sp.on('data', function (input) {
		console.log(input);
	    socket.emit('news', { sensor: input });
	}); // Send data to client
});


// ici on initialise notre serveur http, son unique rôle est d'envoyer la page index.html qui contient le code du client
var http = require('http'),
	fs = require('fs');


fs.readFile('./index.html', function (err, html) {
	if (err) {
		throw err;
	}
	http.createServer(function (request, response) {
		response.writeHeader(200, { "Content-Type": "text/html" });
		response.write(html);
		response.end();
	}).listen(8000);
});


