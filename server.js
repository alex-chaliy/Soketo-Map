'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

let address = config.server.protocol + '://' + config.server.address + ':' + config.server.port;


const app = express();


let mapObjectsData = [
	{
		_id: 'mo0',
		xx: 46.45945,
		yy: 30.75209
	},
	{
		_id: 'mo1',
		xx: 46.45942,
		yy: 30.75208
	}
];

let getRandInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
let moveEmit = () => {
	mapObjectsData.forEach((el) => {
		let randNumberX = getRandInt(0, 999);
		let randNumberY = getRandInt(0, 999);
		el.xx = el.xx + 0.00001 * Math.pow(-1, randNumberX);
		el.yy = el.yy + 0.00001 * Math.pow(-1, randNumberY);
	});
}

var server = require('http').createServer(app);

var io = require('socket.io')(server);

let socketConfig = {
	timeToNextResponse: 60
};

io.on('connection', (socket) => {
	setInterval(() => {
		moveEmit();
		socket.emit('mapObjects', mapObjectsData);
	}, socketConfig.timeToNextResponse);
});

server.listen(config.server.port, () => {
	console.log('server listening at ' + address);
});


/*******
* Routes *
********/

/** others **/
	app.use('/', express.static(__dirname + '/public'));
	app.use('/node_modules', express.static(__dirname + '/node_modules'));

	app.use(bodyParser.json());