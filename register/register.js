'use strict';

angular.module('myApp.register', ['ngRoute', 'firebase'])

    // Declared route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    // Register controller
    .controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
        var firebaseObj = new Firebase("https://radiant-torch-2188.firebaseIO.com");
        var auth = $firebaseAuth(firebaseObj);

        $scope.signUp = function () {
            var password = $scope.user.password;
            var s = 0;
            if (password.length >= 7) {
                s++;
            }
            if (/[0-9]/.test(password))
                s++;
            if (/[a-z]/.test(password))
                s++;
            if (/[A-Z]/.test(password))
                s++;
            if (/[^A-Z-0-9]/i.test(password))
                s++;
            if (s < 5) {
                $scope.error = true;
                $scope.errorMessage = "Пароль должен содержать: не меньше 7 символов, заглавную и прописную букву, цифру, знак преписания!";
            }

            if (s >= 5) {
                $scope.error = false;
                if (!$scope.regForm.$invalid) {
                    var email = $scope.user.email;
                    if (email && password) {
                        auth.$createUser(email, password)
                            .then(function () {
                                alert("Пользователь успешно создан");
                                $location.path('/home');
                            }, function (error) {
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
