'use strict';

let mapController = ($scope, $http, $location, ui) => {
	$scope.ui = ui;

	let socket = io('http://localhost:5414');

	let MapObject = {};
	MapObject.config = {
		timeToNextRequest: 750
	};
	MapObject.get = () => {
		socket.emit('getMapObjects');
	}
	socket.on('mapOBjects', (mapOBjectsData) => {
		console.log(mapOBjectsData);
	});
	setInterval(() => {
		MapObject.get();
	}, MapObject.config.timeToNextRequest);
}
mapController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('mapController', mapController);