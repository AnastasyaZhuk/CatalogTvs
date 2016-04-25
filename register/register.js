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
            if (!$scope.regForm.$invalid) {
                var email = $scope.user.email;
                var password = $scope.user.password;
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
        };
    }]);
