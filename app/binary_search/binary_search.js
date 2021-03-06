(function () {
    'use strict';

    angular.module('search-algorithms')
        .controller('BinarySearch', [
            '$scope',
            function ($scope) {
                $scope.card = '';
                $scope.cards = [
                    {image: '/images/cards/ace of spades.png', title: 'Ás de Espadas', value: 1, selected: 'no-shadow'},
                    {image: '/images/cards/two of spades.png', title: 'Dois de Espadas', value: 2, selected: 'no-shadow'},
                    {image: '/images/cards/three of spades.png', title: 'Três de Espadas', value: 3, selected: 'no-shadow'},
                    {image: '/images/cards/four of spades.png', title: 'Quatro de Espadas', value: 4, selected: 'no-shadow'},
                    {image: '/images/cards/five of spades.png', title: 'Cinco de Espadas', value: 5, selected: 'no-shadow'},
                    {image: '/images/cards/six of spades.png', title: 'Seis de Espadas', value: 6, selected: 'no-shadow'},
                    {image: '/images/cards/seven of spades.png', title: 'Sete de Espadas', value: 7, selected: 'no-shadow'},
                    {image: '/images/cards/eight of spades.png', title: 'Oito de Espadas', value: 8, selected: 'no-shadow'},
                    {image: '/images/cards/nine of spades.png', title: 'Nove de Espadas', value: 9, selected: 'no-shadow'},
                    {image: '/images/cards/ten of spades.png', title: 'Dez de Espadas', value: 10, selected: 'no-shadow'},
                    {image: '/images/cards/jack of spades.png', title: 'Valete de Espadas', value: 11, selected: 'no-shadow'},
                    {image: '/images/cards/queen of spades.png', title: 'Rainha de Espadas', value: 12, selected: 'no-shadow'},
                    {image: '/images/cards/king of spades.png', title: 'Rei de Espadas', value: 13, selected: 'no-shadow'}
                ];

                var index = 0;

                $scope.findCard = function () {
                    var low = 0,
                        found = false,
                        high = $scope.cards.length - 1;

                    $scope.cards.forEach(function(card) {
                        card.selected = 'no-shadow';
                    });

                    while (high >= low) {
                        var mid = Math.floor((low + high)/2);
                        console.log(mid);

                        $scope.cards[mid].selected = 'selected-card';


                        if ($scope.card < $scope.cards[mid].value) {
                            high = mid - 1;
                        } else if ($scope.card > $scope.cards[mid].value) {
                            low = mid + 1;
                        } else {
                            found = true;
                            index = mid;
                            $scope.cards[mid].selected = 'found-card';
                            break;
                        }
                    }
                }
            }
        ]);
})();