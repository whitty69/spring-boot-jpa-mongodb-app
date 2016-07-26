angular.module('REEManagerApp.controllers', [])
    .controller("AppCtrl", function() {
        var self = this;
        self.message = "The app routing is working!";
    })
    .controller("LoginController",

        function($rootScope, $scope, $http, $location) {

            var self = this;
/*
            $http.get("/user").success(function(data) {
                self.user = data.userAuthentication.details.name;
                self.authenticated = true;
            }).error(function() {
                self.user = "N/A";
                self.authenticated = false;
            });
*/

            self.logout = function() {
                $http.post('logout', {}).success(function() {
                    self.authenticated = false;
                    $location.path("/");
                }).error(function(data) {
                    console.log("Logout failed")
                    self.authenticated = false;
                });
            };
            var authenticate = function(credentials, callback) {

                var headers = credentials ? {authorization : "Basic "
                + btoa(credentials.username + ":" + credentials.password)
                } : {};

                $http.get('user', {headers : headers}).success(function(data) {
                    if (data.name) {
                        $rootScope.authenticated = true;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    callback && callback();
                }).error(function() {
                    $rootScope.authenticated = false;
                    callback && callback();
                });

            }

            authenticate();

            $scope.credentials = {};
            $scope.login = function() {
                authenticate($scope.credentials, function() {
                    if ($rootScope.authenticated) {
                        self.authenticated = true;
                        $location.path("/");
                        $scope.error = false;
                    } else {
                        self.authenticated = false;
                        $location.path("/");
                        $scope.error = true;
                    }
                });
            };
    })
    .controller('REESystemsController', function($scope, reeAPI){
        var self = this;
        $scope.systems = [];

        reeAPI.getSystems().success(function (response) {
            //Dig into the responde to get the relevant data
            $scope.systems = response.reSystems;
        });

        self.listSystems = function($scope) {
            $http.get('pxc/ree/system/list', {}).success(function(data) {
                console.log(data);
                $scope.systems = data;
            }).error(function(data) {
                console.log("Listing failed : " + data);
            });
        };
        $scope.addSystem = function(name, descr, targetDBSchema) {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);

            $http.post('pxc/ree/system', {name, descr, targetDBSchema}).success(function(data) {
                $scope.systems.push(data);
            }).error(function(data) {
                console.log("Error Occurred")
                self.authenticated = false;
            });
        };

    })
    .controller('REESystemController', function($scope, reeAPI){
        var self = this;
        $scope.systems = [];

        reeAPI.getSystems().success(function (response) {
            //Dig into the responde to get the relevant data
            $scope.systems = response.reSystems;
        });


    })
    .controller('ModalCtrl', function ($scope) {
        $scope.showModal = false;
        $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    }}).directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
