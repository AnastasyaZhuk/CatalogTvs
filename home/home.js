'use strict';
angular.module('myApp.home', ['ngRoute','firebase'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .service('CommonProp', function() {
        var user = '';

        return {
            getUser: function() {
                return user;
            },
            setUser: function(value) {
                user = value;
            }
        };
    })


    // контроллер home
    .controller('HomeCtrl', ['$scope','$location', 'CommonProp', '$firebaseAuth',function($scope,$location, CommonProp,$firebaseAuth) {
        $scope.SignIn = function(event) {
            event.preventDefault(); // предотвращаем перезагрузку страницы
            var username = $scope.user.email;
            var password = $scope.user.password;
            loginObj.$authWithPassword({
                    email: username,
                    password: password
                })
                .then(function(user) {
                    // колбэк запустится при успешной аутентификации аутентификацииSuccess callback
                    console.log('Authentication successful');
                    CommonProp.setUser(user.password.email);
                    $location.path('/catalog');
                }, function(error) {
                    // колбэк при неудаче
                    console.log('Authentication failure');
                });
        };
        var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com");
        var loginObj = $firebaseAuth(firebaseObj);
    }]);