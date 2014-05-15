(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btLeadCategory', ['leadCategories', function(leadCategories) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        category: '@',
        width: '@'
      },
      template: function(el, attrs) {
        var html;
        if (attrs.width === 'equal') {
          html = '<span class="cat cat-eq cat-{{ cat | lowercase }}">{{ cat }}</span>';
        } else if (attrs.width === 'abbreviated') {
          html = '<span class="cat cat-eq-abbr cat-{{ cat | lowercase }}">{{ abbr }}</span>';
        } else {
          html = '<span class="cat cat-{{ cat | lowercase }}">{{ cat }}</span>';
        }
        return html;
      },
      link: function(scope, element, attrs) {
        var categories = {},
            abbrs = {};
        leadCategories.forEach(function(category) {
          categories[category.value.toString()] = category.name;
          abbrs[category.value.toString()] = category.abbr;
        });
        scope.cat = categories[scope.category];
        scope.abbr = abbrs[scope.category];
      }
    };
  }]);
})(angular.module('boomstrap'));
