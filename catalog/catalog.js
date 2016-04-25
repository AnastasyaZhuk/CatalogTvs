'use strict';

var tvControllers = angular.module('myApp.catalog', ['ngRoute']);

tvControllers.config(['$routeProvider', function($routeProvider) {
         $routeProvider.when('/catalog', {
            templateUrl: 'catalog/catalog.html',
            controller: 'TVListCtrl'
        }).otherwise({
             redirectTo: '/catalog'
         });
    }]);

   tvControllers.controller('TVListCtrl', ['$scope', '$firebase', 'CommonProp','$http', function($scope,$firebase, CommonProp, $http) {
       // var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com/TVs");
       // var sync = $firebase(firebaseObj);
       // $scope.test = sync.$asArray();      // Получаем данные из Firebase

       console.log("TVListCtrl");
        $http.get('json/tvs.json').success(function(data) {
            $scope.tvs = data;
        });
         $scope.username = CommonProp.getUser();
         $scope.orderProp = 'age';
    }]);


