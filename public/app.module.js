'use strict';

const app = angular.module('app', ['ngRoute']);

// Routes
let routesConfig = ($routeProvider) => {
	$routeProvider.
		when('/home', {
			templateUrl: 'components/pages/home/home.html',
			controller: 'homeController'
		})
		.when('/map', {
			templateUrl: 'components/pages/map/map.html',
			controller: 'mapController'
		})
		.otherwise({
			redirectTo: '/home'
		});
}
routesConfig.$inject = ['$routeProvider'];

app.config(routesConfig);