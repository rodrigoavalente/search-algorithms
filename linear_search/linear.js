(function () {
    'use strict';

    angular.module('search-algorithms')
        .controller('LinearSearch', [
            '$scope',
            function ($scope) {

                $scope.card = '';
                $scope.cards = [
                    {image: './images/cards/ace_of_spades.png', title: 'Ás de Espadas', value: 1, selected: 'no-shadow'},
                    {image: './images/cards/two_of_spades.png', title: 'Dois de Espadas', value: 2, selected: 'no-shadow'},
                    {image: './images/cards/three_of_spades.png', title: 'Três de Espadas', value: 3, selected: 'no-shadow'},
                    {image: './images/cards/four_of_spades.png', title: 'Quatro de Espadas', value: 4, selected: 'no-shadow'},
                    {image: './images/cards/five_of_spades.png', title: 'Cinco de Espadas', value: 5, selected: 'no-shadow'},
                    {image: './images/cards/six_of_spades.png', title: 'Seis de Espadas', value: 6, selected: 'no-shadow'},
                    {image: './images/cards/seven_of_spades.png', title: 'Sete de Espadas', value: 7, selected: 'no-shadow'},
                    {image: './images/cards/eight_of_spades.png', title: 'Oito de Espadas', value: 8, selected: 'no-shadow'},
                    {image: './images/cards/nine_of_spades.png', title: 'Nove de Espadas', value: 9, selected: 'no-shadow'},
                    {image: './images/cards/ten_of_spades.png', title: 'Dez de Espadas', value: 10, selected: 'no-shadow'},
                    {image: './images/cards/jack_of_spades.png', title: 'Valete de Espadas', value: 11, selected: 'no-shadow'},
                    {image: './images/cards/queen_of_spades.png', title: 'Rainha de Espadas', value: 12, selected: 'no-shadow'},
                    {image: './images/cards/king_of_spades.png', title: 'Rei de Espadas', value: 13, selected: 'no-shadow'}
                ];

                var global_index = 0;

                var setDelay = function (card, index) {
                    setTimeout(function () {
                        if (!global_index) {
                            card.selected = 'selected-card';
                            $scope.$apply();

                            if (card.value == $scope.card) {
                                card.selected = 'found-card';
                                global_index = index;
                                $scope.$apply();
                            } else {
                                card.selected = 'no-shadow';
                            }
                        }

                    }, (index + 1) * 500);
                };

                $scope.findCard = function (event) {
                    event.preventDefault();
                    global_index = 0;
                    $scope.cards.forEach(setDelay);
                };
            }
        ]);
})();