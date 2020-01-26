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
