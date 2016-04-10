(function () {
    'use strict';

    angular.module('search-algorithms', [
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        'oc.lazyLoad',
        'md.data.table'
    ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            '$ocLazyLoadProvider',
            '$mdThemingProvider',
            function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $mdThemingProvider) {
                $ocLazyLoadProvider.config({
                    debug: true,
                    events: true
                });

                $stateProvider
                    .state('site', {
                        abstract: true,
                        template: '<ui-view />',
                        controller: 'TabCtrl',
                        resolve: {
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/scripts/controllers/tabs.js'
                                    ]
                                });
                            }
                        }
                    })
                    .state('site.home', {
                        url: '/home',
                        templateUrl: '/home/home.html'
                    })
                    .state('site.linear_search', {
                        url: '/busca-linear',
                        templateUrl: '/linear_search/linear.html',
                        controller: 'LinearSearch',
                        resolve: {
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/linear_search/linear.js'
                                    ]
                                })
                            }
                        }
                    })
                    .state('site.self_organizing_search', {
                        url: '/busca-auto-organizadora',
                        templateUrl: '/self_organizing_search/self_search.html',
                        controller: 'SelfOrganizingSearch',
                        resolve: {
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/self_organizing_search/self_search.js'
                                    ]
                                });
                            }
                        }
                    })
                    .state('site.binary_search', {
                        url: '/busca-binaria',
                        templateUrl: '/binary_search/binary_search.html',
                        controller: 'BinarySearch',
                        resolve: {
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/binary_search/binary_search.js'
                                    ]
                                })
                            }
                        }
                    })
                    .state('site.hash_table', {
                        url: '/tabela-de-dispersao',
                        templateUrl: '/hash_table/hash_table.html',
                        controller: 'HashTable',
                        resolve: {
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/hash_table/hash_table.js'
                                    ]
                                });
                            }
                        }
                    })
                    .state('site.depth_first_search', {
                        url: '/busca-profunda',
                        templateUrl: '/depth_first_search/depth_first_search.html',
                        controller: 'DepthFirstSearch',
                        resolve: {
                            loadMyDirectives: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/scripts/directives/binary_tree/binary_tree.js'
                                    ]
                                });
                            },
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/depth_first_search/depth_first_search.js'
                                    ]
                                });
                            }
                        }
                    })
                    .state('site.breadth_first_search', {
                        ulr: '/busca-em-profundidade',
                        templateUrl: '/breadth_first_search/breadth_first_search.html',
                        controller: 'BreadthFirstSearch',
                        resolve: {
                            loadMyDirectives: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/scripts/directives/binary_tree/binary_tree.js'
                                    ]
                                });
                            },
                            loadMyFiles: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'search-algorithms',
                                    files: [
                                        '/breadth_first_search/breadth_first_search.js'
                                    ]
                                });
                            }
                        }
                    });

                $urlRouterProvider.otherwise('/home');
            }
        ])

})();
