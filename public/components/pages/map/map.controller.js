'use strict';

let mapController = ($scope, $http, $location, ui) => {
	// include ui in scope to get access from template
	$scope.ui = ui;
}
mapController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('mapController', mapController);