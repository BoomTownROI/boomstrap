(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btAddClassOnLoad', function () {
    return {
      link: function(scope, element, attrs) {
        attrs.$observe('btAddClassOnLoad', function(attrClass) {
          element.bind('load', function(){
            element.addClass(attrClass);
          });
        });
      }
    };
  });
})(angular.module('Boomstrap'));
