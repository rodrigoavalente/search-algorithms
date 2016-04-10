(function () {
    'use strict';

    angular.module('search-algorithms')
        .directive('loadSvg', function (svg) {
           return {
               templateNamespace: 'svg',
               replace: true,
               template: svg
           }
        });
})();