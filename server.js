'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

let address = config.server.protocol + '://' + config.server.address + ':' + config.server.port;


const app = express();

app.listen(config.server.port, () => {
	console.log('server listening at ' + address);
});

/*******
* Routes *
********/

/** others **/
	app.use('/', express.static(__dirname + '/public'));
	app.use('/node_modules', express.static(__dirname + '/node_modules'));

	app.use(bodyParser.json());