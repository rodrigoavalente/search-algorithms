(function () {
    'use strict';

    angular.module('search-algorithms')
        .controller('BreadthFirstSearch', [
            '$scope',
            'BinaryTree',
            function ($scope, BinaryTree) {
                $scope.array = '';
                $scope.value = '';

                $scope.create_binary_tree = function ($event) {
                    $event.preventDefault();

                    document.getElementById('binary-tree').innerHTML = '';

                    var values = $scope.array.split(',');

                    $scope.binay_tree = new BinaryTree();
                    angular.forEach(values, function (value) {
                        $scope.binay_tree.add(value.trim());
                    });

                    $scope.binay_tree.draw();

                    $scope.array = '';
                    console.log('Árvore:', $scope.binay_tree.toString());
                };

                $scope.find_in_tree = function ($event) {
                    $event.preventDefault();

                    $scope.binay_tree.breadth_first_search($scope.value);
                }
            }
        ])
})();