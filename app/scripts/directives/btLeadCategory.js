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
          '<span class="leadcat leadcat-{{ cat | lowercase }}',
          equal ?
            abbr ? ' leadcat-eq-abbr' : ' leadcat-eq'
            : '',
          '">{{ ',
          abbr ? 'abbr' : 'cat',
          '}}</span>'
        ].join('');
      },
      link: function(scope) {
        var updateScope = function() {
          scope.cat = categories[scope.category];
          scope.abbr = abbrs[scope.category];
        };
        updateScope();

        scope.$watch('category', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            updateScope();
          }
        });
      }
    };
  }]);
})(angular.module('boomstrap'));
