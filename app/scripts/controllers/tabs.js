(function () {
    'use strict';

    angular.module('search-algorithms')
        .controller('TabCtrl', [
            '$scope',
            '$location',
            function ($scope, $location) {
                $scope.selectedIndex = 0;

                $scope.$watch('selectedIndex', function (current, old) {
                    switch (current) {
                        case 0:
                            $location.url('/home');
                            break;
                        case 1:
                            $location.url('/busca-linear');
                            break;
                    }
                })
            }
        ])
})();
