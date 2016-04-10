(function () {
    'use strict';

    angular.module('search-algorithms')
        .directive('header', function () {
            return {
                templateUrl: 'scripts/directives/header/header.html',
                restrict: 'E',
                replace: true
            }
        });
})();