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
	// let id = 'alex-chaliy';
	// let zz = 51.505;
	// let yy = 51.505;
	// let xx = 51.505;
	// let token = 'sk.eyJ1IjoiYWxleC1jaGFsaXkiLCJhIjoiY2l3YXczeTMyMDAxdDJ6bzZ6cmtyMXR2YyJ9.zD7fdzpjNqaXKEsPfcstjw';

	// let finalUrl = 'https://api.tiles.mapbox.com/v4/' + id +
	// 				'/' + zz +
	// 				'/' + xx +
	// 				'/' + yy + 
	// 				'.png?access_token=' + token;

	// let mymap = L.map('mapid').setView([51.505, -0.09], 13);
	// L.tileLayer(finalUrl, {
	//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	//     maxZoom: 18,
	//     id: id,
	//     accessToken: token
	// }).addTo(mymap);

/* end Map */

	

	var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	L.marker([51.5, -0.09]).addTo(mymap);

	L.circle([51.508, -0.11], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(mymap);

	L.polygon([
		[51.509, -0.08],
		[51.503, -0.06],
		[51.51, -0.047]
	]).addTo(mymap);





}

mapController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('mapController', mapController);