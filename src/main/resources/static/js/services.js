angular.module('REEManagerApp.services', []).
factory('reeAPIService', function($http) {

    var reeAPI = {};

    reeAPI.getSystems = function() {
        return $http({
            method: 'JSONP',
            url: '/pxc/ree/systems/list'
        });
    }

    return reeAPI;
});