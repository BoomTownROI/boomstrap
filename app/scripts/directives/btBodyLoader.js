(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btBodyLoader', function($parse, $document) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        isLoading: '='
      },
      link: function(scope) {
        var body = $document.find('body'),
            loader = $document.find('#bt-body-loader'),
            template = '<div id="bt-body-loader" class="loader body-loader"><span class="loader-pulse"></span><span class="loader-pulse"></span><span class="loader-pulse"></span></div>';

        if (loader.length > 0) { return true; } // there can be only one

        body.append(template);

        scope.$watch('isLoading', function(newVal) {
          var $loader = angular.element('#bt-body-loader'),
              display = (newVal.value === false) ? 'none' : 'block';

          $loader.css({'display': display});
        }, true);
      }
    };
  });
})(angular.module('boomstrap'));
