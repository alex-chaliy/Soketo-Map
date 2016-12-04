'use strict';

let homeController = ($scope, $http, $location, ui) => {
	// include ui in scope to get access from template
	$scope.ui = ui;
}
homeController.$inject = [
	'$scope',
	'$http',
	'$location',
	'ui'
];

angular.module('app').controller('homeController', homeController);