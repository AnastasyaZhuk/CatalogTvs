'use strict';

angular.module('myApp.addComment', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addComment', {
            templateUrl: 'addComment/addComment.html',
            controller: 'AddCommentCtrl'
        });
    }])

    .controller('AddCommentCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

        $scope.AddComment = function (user) {

        };
        
    }]);
