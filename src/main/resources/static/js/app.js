angular
    .module("app", ['REEManagerApp.controllers', 'REEManagerApp.services' ,'ngRoute'])
    .config(function($httpProvider, $routeProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $routeProvider.when("/authenticate",
            {
                templateUrl: "templates/login.html",
                controller: "LoginController",
                controllerAs: "home"
            }
        )
    });





