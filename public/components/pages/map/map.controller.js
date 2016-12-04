'use strict';

let mapController = ($scope, $http, $location, ui) => {
	$scope.ui = ui;

	let socket = io('http://localhost:5414');


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

	let markerDefault = L.marker([mapConfig.xx, mapConfig.yy]).addTo(mymap);
/* end Map */


	let markers = [];

	let MapObject = {};

	MapObject.renderAll = (mapObjectsData) => {
		let i = 0;
		mapObjectsData.forEach((el) => {
			if(!markers[i]) {
				markers[i] = L.marker([el.xx, el.yy]).addTo(mymap);
			} else {
				markers[i].setLatLng([el.xx, el.yy]);
			}
			i++;
		});
	}

	socket.on('mapObjects', (mapObjectsData) => {
		MapObject.renderAll(mapObjectsData);
		console.log(mapObjectsData);
	});
}

mapController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('mapController', mapController);