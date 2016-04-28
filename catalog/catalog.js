'use strict';

// Объявляем модуль myApp.catalog, который был объявлен в app.js
var tvControllers = angular.module('myApp.catalog', ['ngRoute']);

// Переход по ссылкам осуществляется с помощью ngRoute
tvControllers.config(['$routeProvider', function($routeProvider) {
    // При переходе по ссылке /catalog отобразить catalog.html и использовать контроллер TVListCtrl
         $routeProvider.when('/catalog', {
            templateUrl: 'catalog/catalog.html',
            controller: 'TVListCtrl'
        }).when('/tableView', {
                 templateUrl: 'catalog/tableView.html',
                 controller: 'TVListCtrl'
             })// Иначе отобразить /catalog
             .otherwise({
             redirectTo: '/catalog'
         });
    }]);

// Контроллер TVListCtrl
   tvControllers.controller('TVListCtrl', ['$scope', '$firebase', 'CommonProp','$http', function($scope,$firebase, CommonProp, $http) {
       // var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com/TVs");
       // var sync = $firebase(firebaseObj);
       // $scope.test = sync.$asArray();      // Получаем данные из Firebase

       // Получение каталога данных из tvs.json
        $http.get('json/tvs.json').success(function(data) {
            $scope.tvs = data;
        });

       // Присванивание пользователя
         $scope.username = CommonProp.getUser();
         $scope.orderProp = 'age';
    }]);


