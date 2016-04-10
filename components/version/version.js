'use strict';

angular.module('search-algorithm.version', [
  'search-algorithm.version.interpolate-filter',
  'search-algorithm.version.version-directive'
])

.value('version', '0.1');
