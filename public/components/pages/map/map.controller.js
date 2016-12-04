'use strict';

let mapController = ($scope, $http, $location, ui) => {
	$scope.ui = ui;

	let socket = io('http://localhost:5414');

	let MapObject = {};
	MapObject.config = {
		timeToNextRequest: 750111
	};
	MapObject.get = () => {
		socket.emit('getMapObjects');
	}
	socket.on('mapOBjects', (mapOBjectsData) => {
		console.log(mapOBjectsData);
	});
	// setInterval(() => {
	// 	MapObject.get();
	// }, MapObject.config.timeToNextRequest);
	MapObject.get();


/* Map */
	let mapConfig = {
		token: 'sk.eyJ1IjoiYWxleC1jaGFsaXkiLCJhIjoiY2l3YXczeTMyMDAxdDJ6bzZ6cmtyMXR2YyJ9.zD7fdzpjNqaXKEsPfcstjw',
		xx: 46.45941,
		yy: 30.75207,
		zz: 17,
		maxZoom: 20,
		id: 'mapbox.streets'
	};

	let finalUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapConfig.token;

	var mymap = L.map('mapid').setView([mapConfig.xx, mapConfig.yy], mapConfig.zz);

	L.tileLayer(finalUrl, {
		maxZoom: mapConfig.maxZoom,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					 '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: mapConfig.id
	}).addTo(mymap);

	L.marker([mapConfig.xx, mapConfig.yy]).addTo(mymap);
/* end Map */

}

mapController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('mapController', mapController);