'use strict';

angular.module('myApp.addComment', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:tvId/comments', {
            // Если url заканчивается /:tvId/comments, то перейти на отображение addComment.html, использовать контроллер AddCommentCtrl
            templateUrl: 'addComment/addComment.html',
            controller: 'AddCommentCtrl'
        });
    }])

    // контроллер AddCommentCtrl
    .controller('AddCommentCtrl', ['$scope', 'CommonProp', '$routeParams', '$firebase', function ($scope, CommonProp, $routeParams, $firebase) {
       // Если кнопка "Новый отзыв" нажата, то отобразить форму
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
        // получить id текущего товара
        $scope.idTv = $routeParams.tvId;
        // ссылка для чтения и записи из Firebase
        var fb = $firebase(new Firebase("https://radiant-torch-2188.firebaseio.com/Comments"));
        // Получаем список объектов из Firebase
        $scope.comments = fb.$asObject();

        // Метод для добавления нового отзыва, срабатывает при нажатии на кнопку "Оставить отзыв"
        $scope.AddComment = function () {
            // Получаем значение полей Заголовок и Комментарии
            var title = $scope.comment.title;
            var desc = $scope.comment.desc;
            // Создаем новый объект
            fb.$push({
                idTv: $scope.idTv, //  id объекта
                title: title, // заголовок
                desc: desc, // комментарии
                user: CommonProp.getUser() // пользователь, под которым находимся в системе
            }).then(function (ref) {
                // если нет ошибки, очистить значение полей и закрыть форму
                $scope.comment.title = '';
                $scope.comment.desc = '';
                $("span").removeClass("show");
            }, function (error) {
                // если произошла ошибка, то вывести
                alert("Произошла ошибка " + error);
            });
        };
    }]);
