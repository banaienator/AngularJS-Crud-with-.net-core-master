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
