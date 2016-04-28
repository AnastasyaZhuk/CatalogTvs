'use strict';

angular.module('myApp.addComment', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:tvId/comments', {
            templateUrl: 'addComment/addComment.html',
            controller: 'AddCommentCtrl'
        });
    }])

    .controller('AddCommentCtrl', ['$scope', 'CommonProp', '$routeParams', '$firebase', function ($scope, CommonProp, $routeParams, $firebase) {
        $("button").on("click", function () {
            var state = $(this).data('state');
            state = !state;
            if (state) {
                $("span").addClass("show");
            } else {
                $("span").removeClass("show");
            }
            $(this).data('state', state);
        });
        $scope.idTv = $routeParams.tvId;
        var fb = $firebase(new Firebase("https://radiant-torch-2188.firebaseio.com/Comments"));
        $scope.comments = fb.$asObject();

        $scope.AddComment = function () {
            var title = $scope.comment.title;
            var desc = $scope.comment.desc;
            fb.$push({
                idTv: $scope.idTv,
                title: title,
                desc: desc,
                user: CommonProp.getUser()
            }).then(function (ref) {
                $scope.comment.title = '';
                $scope.comment.desc = '';
                $("span").removeClass("show");
                // alert("Отзыв успешно добавлен");
            }, function (error) {
                alert("Произошла ошибка " + error);
            });
        };
    }]);
