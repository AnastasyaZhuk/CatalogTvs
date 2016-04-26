'use strict';

// Объявляем модуль myApp.register, который был объявлен в app.js
angular.module('myApp.register', ['ngRoute', 'firebase'])

    // Переход по ссылкам осуществляется с помощью ngRoute
    .config(['$routeProvider', function ($routeProvider) {
        // При переходе по ссылке /register отобразить register.html и использовать контроллер RegisterCtrl
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    // Контроллер RegisterCtrl
    .controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
        var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com");
        var auth = $firebaseAuth(firebaseObj);

        $scope.signUp = function () {
            // Проверка сложности пароля
            var password = $scope.user.password;
            var s = 0;
            // Длина пароля не должна быть меньше 7 символов
            if (password.length >= 7) {
                s++;
            }
            // Пароль должен содержать хотя бы одну цифру
            if (/[0-9]/.test(password))
                s++;
            // Пароль должен содержать хотя бы одну прописную букву
            if (/[a-z]/.test(password))
                s++;
            // Пароль должен содержать хотя бы одну заглавную букву
            if (/[A-Z]/.test(password))
                s++;
            // Пароль должен содержать хотя бы одни знак препинания
            if (/[^A-Z-0-9]/i.test(password))
                s++;
            // Если все проверки на сложность пароля не пройдены, то вывести ошибку
            if (s < 5) {
                $scope.error = true;
                $scope.errorMessage = "Пароль должен содержать: не меньше 7 символов, заглавную и прописную букву, цифру, знак преписания!";
            }

            // Иначе перейти к регистрации пользователя
            if (s >= 5) {
                $scope.error = false;
                // Проверяется валидность формы
                if (!$scope.regForm.$invalid) {
                    // Получаем адрес эоектронной почты
                    var email = $scope.user.email;
                    if (email && password) {
                        // Создание пользователя в системе
                        auth.$createUser(email, password)
                            // В случае успешной регистрации показать пользователю сообщение и перейти на страницу авторизации
                            .then(function () {
                                    alert("Пользователь успешно создан");
                                    $location.path('/home');
                                }, // Если проищошла ошибка, показать сообщение об этом
                                function (error) {
                                    var emailInUse = "The specified email address is already in use.";
                                    $scope.regError = true;
                                    if (error.message == emailInUse) {
                                        $scope.regErrorMessage = "Указанный адрес электронной почты уже используется."
                                    }
                                    else {
                                        $scope.regErrorMessage = error.message;
                                    }
                                });
                    }
                }
            }
        };
    }]);
