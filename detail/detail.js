'use strict';

angular.module('myApp.detail', ['ngRoute','ngAnimate','ngTouch'])

    
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:tvId', {
        templateUrl: 'detail/detail.html',
        controller: 'TVDetailCtrl'
    }).otherwise({
        redirectTo: '/catalog'
    });
}]);

tvControllers.controller('TVDetailCtrl', ['$scope', '$routeParams','$http',
    function ($scope, $routeParams, $http) {
        console.log("TVDetailCtrl");
        $http.get('json/' + $routeParams.tvId + '.json').success(function (data) {
            $scope.tvs = data;
            $scope.photos = $scope.tvs.images;
      });

        // initial image index
        $scope._Index = 0;

        // if a current image is the same as requested image
        $scope.isActive = function (index) {
            return $scope._Index === index;
        };

        // show prev image
        $scope.showPrev = function () {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
        };

        // show next image
        $scope.showNext = function () {
            $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
        };

        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };
    }]); 