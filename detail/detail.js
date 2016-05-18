'use strict';

angular.module('myApp.detail', ['ngRoute','ngAnimate','ngTouch'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:tvId', {
        // Если адрес /detail/:tvId, то используем detail.html и контроллер TVDetailCtrl
        templateUrl: 'detail/detail.html',
        controller: 'TVDetailCtrl'
    }).otherwise({ // иначе возвращаемся на страницу каталога
        redirectTo: '/catalog'
    });
}]);

// контроллер TVDetailCtrl
tvControllers.controller('TVDetailCtrl', ['$scope', '$routeParams','$http',
    function ($scope, $routeParams, $http) {
        console.log("TVDetailCtrl");
        // Получаем id товара, на который перешли
        $scope.idTv = $routeParams.tvId;
        // Получаем данные из json файла по id товара
        $http.get('json/' + $routeParams.tvId + '.json').success(function (data) {
            $scope.tvs = data;
            $scope.photos = $scope.tvs.images;
      });

        // инициализация индекса для фотографии
        $scope._Index = 0;

        // Если текущее изображение является таким же, как выбранное изображение
        $scope.isActive = function (index) {
            return $scope._Index === index;
        };

        // показать предыдущее изображение
        $scope.showPrev = function () {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
        };

        //  показать следующее изображение
        $scope.showNext = function () {
            $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
        };

        //показать выбранное изображение
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };
    }]); 