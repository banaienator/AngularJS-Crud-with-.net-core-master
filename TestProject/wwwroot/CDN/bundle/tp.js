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




'use strict';
app
    .controller('employee_controller',
        function ($scope, $http) {

            $scope.phoneNumbr = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

            $scope.load_employee = function () {
                $http
                    .get('/employee/get_all_employees')
                    .then(function (response) {
                        $scope.employees = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }

            $scope.delete_employee = function (id) {
                if (!confirm('از حذف مطمئنید؟'))
                    return;

                $http
                    .post("/employee/delete_employee?id=" + id)
                    .then(function (response) {
                        var rresult = response.data;
                        if (rresult.isOK) {
                            alert(rresult.message);
                            $scope.reset();
                        } else {
                            alert("در عملیات حذف خطایی رخ داده است");
                        }
                    });
            }

            $scope.add_employee = function () {
                $scope.new_employee = true
                document.title = "افزودن کارمند جدید";
            };

            $scope.edit_employee = function (id) {

                $http.get('/employee/get_employee?id=' + id)
                    .then(function (response) {
                        $scope.employee = response.data;
                        document.title = "ویرایش کارمند جدید";
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            };

            $scope.reset = function () {
                $scope.employee = null;
                $scope.new_employee = false;
                $scope.load_employee();
                document.title = "کارمندان";
            };

            $scope.save_employee = function () {

                $http({
                    method: 'post',
                    url: '/employee/add_or_update_employee',
                    dataType: 'json',
                    params: $scope.employee,
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) {
                        var rresult = response.data;
                        if (rresult.isOK) {
                            alert(rresult.message);
                            $scope.reset();

                        } else {
                            alert("در عملیات ثبت خطایی رخ داده است");
                        }
                    });
            };

            $scope.load_employee();

        });

'use strict';
app
    .controller('manager_controller',
        function ($scope, $http) {

            $scope.phoneNumbr = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

            $scope.load_manager = function () {
                $http
                    .get('/manager/get_all_managers')
                    .then(function (response) {
                        $scope.managers = response.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }

            $scope.delete_manager = function (id) {
                if (!confirm('از حذف مطمئنید؟'))
                    return;

                $http
                    .post("/manager/delete_manager?id=" + id)
                    .then(function (response) {
                        var rresult = response.data;
                        if (rresult.isOK) {
                            alert(rresult.message);
                            $scope.reset();
                        } else {
                            alert("در عملیات حذف خطایی رخ داده است");
                        }
                    });
            }

            $scope.add_manager = function () {
                $scope.new_manager = true
                document.title = "افزودن مدیر جدید";
            };

            $scope.edit_manager = function (id) {

                $http.get('/manager/get_manager?id=' + id)
                    .then(function (response) {
                        $scope.manager = response.data;
                        document.title = "ویرایش مدیر جدید";
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            };

            $scope.reset = function () {
                $scope.manager = null;
                $scope.new_manager = false;
                $scope.load_manager();
                document.title = "مدیران";
            };

            $scope.save_manager = function () {

                $http({
                    method: 'post',
                    url: '/manager/add_or_update_manager',
                    dataType: 'json',
                    params: $scope.manager,
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) {
                        var rresult = response.data;
                        if (rresult.isOK) {
                            alert(rresult.message);
                            $scope.reset();

                        } else {
                            alert("در عملیات ثبت خطایی رخ داده است");
                        }
                    });
            };

            $scope.load_manager();

        });