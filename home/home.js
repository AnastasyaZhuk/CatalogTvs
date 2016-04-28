'use strict';

// Объявляем модуль myApp.home, который был объявлен в app.js
angular.module('myApp.home', ['ngRoute','firebase'])
    
    // Переход по ссылкам осуществляется с помощью ngRoute
    .config(['$routeProvider', function($routeProvider) {
        // При переходе по ссылке /home отобразить home.html и использовать контроллер HomeCtrl
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    // Узнать под каким пользователем был осуществлен вход
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

    // Контроллер HomeCtrl
    .controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function ($scope, $location, CommonProp, $firebaseAuth) {
        // Ссылка на проект FireBase для проверки авторизации пользователя
        var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com");
        var loginObj = $firebaseAuth(firebaseObj);

        $scope.SignIn = function(event) {
            event.preventDefault(); // предотвращаем перезагрузку страницы
            var username = $scope.user.email; // Получаем электронную почту 
            var password = $scope.user.password; // Получаем пароль
            // Авторизируем пользователя в системе FireBase
            loginObj.$authWithPassword({
                    email: username,
                    password: password
                })
            // Если ошибок нет, то выполняется функция then
                .then(function(user) {
                    // Присваиваем юзеру текущий адрес электронной почты
                    CommonProp.setUser(user.password.email);
                    // то переходим на страницу /catalog
                    $location.path('/catalog');
                }, function(error) {
                    // При ошибки отображение ошибки
                    alert("Произошла ошибка при авторизации");
                });
        };
    }]);