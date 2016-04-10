(function () {
   'use strict';

    angular.module('search-algorithms')
        .controller('HashTable', [
            '$scope',
            function ($scope) {
                var id = 1,
                    last_index = 0;

                $scope.name = '';
                $scope.about = '';

                $scope.contacts = new Array(19);
                $scope.contacts.push({id: id++, name: '', about: ''});

                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1
                };

                var hash = function (name) {
                    var index = 0;

                    for (var i = 0; i < name.length; i++) {
                        index = (index * 9) ^ name.charCodeAt(i);
                    }

                    return (index >>> 0) % 19
                };

                $scope.add_contact = function (event) {
                    event.preventDefault();

                    var index = hash($scope.name);

                    if ($scope.contacts[index] === undefined) {
                        $scope.contacts[index] = {
                            id: id++,
                            name: $scope.name,
                            about: $scope.about,
                            'class': 'selected-row'
                        };
                    } else if ($scope.name !== $scope.contacts[index].name){
                        $scope.contacts[index]['class'] = 'conflict-row';
                    } else {
                        $scope.contacts[index]['class'] = 'found-row';
                    }

                    if ($scope.contacts[last_index] && last_index !== index) {
                        $scope.contacts[last_index]['class'] = 'no-shadow';
                    }
                    last_index = index;

                    console.log($scope.contacts);
                }
            }
        ])
})();