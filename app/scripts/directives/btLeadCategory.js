(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btLeadCategory', ['leadCategories', function(leadCategories) {
    var categories = {},
      abbrs = {};

    leadCategories.forEach(function(category) {
      categories[category.value.toString()] = category.name;
      abbrs[category.value.toString()] = category.abbr;
    });
    
    return {
      restrict: 'E',
      replace: true,
      scope: {
        category: '@',
        width: '@'
      },
      template: function(el, attrs) {
        var equal = attrs.hasOwnProperty('equal'),
          abbr = attrs.hasOwnProperty('abbreviated');

        return [
          '<span class="cat cat-{{ cat | lowercase }}',
          equal ?
            abbr ? ' cat-eq-abbr' : ' cat-eq'
            : '',
          '">{{ ',
          abbr ? 'abbr' : 'cat',
          '}}</span>'
        ].join('');
      },
      link: function(scope) {
        scope.cat = categories[scope.category];
        scope.abbr = abbrs[scope.category];
      }
    };
  }]);
})(angular.module('boomstrap'));
