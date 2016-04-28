'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'myApp.home',
    'myApp.register',  
    'myApp.catalog',
    'myApp.detail',
    'myApp.addComment'
]). // Объявление всех модулей проекта
config(['$routeProvider', function($routeProvider) {
    // По умолчанию приложение будет открываться /home
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);