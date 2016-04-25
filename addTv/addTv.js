'use strict';

angular.module('myApp.addTv', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addTv', {
            templateUrl: 'addTv/addTv.html',
            controller: 'AddTvCtrl'
        });
    }])

    .controller('AddTvCtrl', ['$scope', '$http', '$firebase', '$location', 'CommonProp', function ($scope, $http, $firebase, $location, CommonProp) {
        $scope.AddTv = function (files) {
            var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com/TVs");
            var fb = $firebase(firebaseObj);

            // var userImageUploader = document.getElementById('pictures');
            // Upload.base64DataUrl(files).then(function (base64Urls) {

                fb.$push({
                    model: $scope.tv.model,
                    description: $scope.tv.description,
                    emailId: CommonProp.getUser()
                    // images: base64Urls
                }).then(function (ref) {
                    console.log(ref);
                    alert("Объект успешно создан");
                    $location.path('/catalog');
                }, function (error) {
                    console.log("Error:", error);
                });
            // });
        };
    }]);
