'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'ngGrid',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
