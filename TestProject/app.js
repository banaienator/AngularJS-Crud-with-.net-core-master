'use strict';
var app = angular.module("app", [
    "ngRoute",
    "ui.router"]
);

app
    .config(function ($routeProvider) {

        $routeProvider
            .when("/employee",
                {
                    name: 'employee',
                    title: "کارمندان",
                    templateUrl: "pages/employee/employee.html",
                    controller: "employee_controller"
                })
            .when("/manager",
                {
                    name: 'manager',
                    title: "مدیران",
                    templateUrl: "pages/manager/manager.html",
                    controller: "manager_controller"
                })
            .when("/homepage",
                {
                    name: 'homepage',
                    title: "صفحه اصلی",
                    templateUrl: "pages/homepage/homepage.html",
                    controller: "home_controller"
                })
            .otherwise(
                {
                    redirectTo: '/homepage'
                });
    })

    .run(['$rootScope', '$route', function ($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function () {
            document.title = $route.current.title;
        });
    }])

    .controller('home_controller',
        function ($scope) {
            $scope.message = "صفحه اصلی ";
        });



