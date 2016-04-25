'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'myApp.home',
    'myApp.register',  // Newly added register route
    'myApp.catalog',// Newly added module
    'myApp.detail',
    'myApp.addTv'
]).
config(['$routeProvider', function($routeProvider) {
    // Set defualt view of our app to home

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);