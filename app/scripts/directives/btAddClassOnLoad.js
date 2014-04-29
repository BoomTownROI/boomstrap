(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btAddClassOnLoad
   * @restrict A
   * 
   * @param {string} btAddClassOnLoad The string representation of the class to add to the image
   *
   * @description
   * The `btAddClassOnLoad` directive adds a class to an img tag
   * when the image fires the load event.  This is useful for
   * css transitions.
   *
   * @element img
   *
   * @example
      <doc:example module="boomstrap">
        <doc:source>
          <script>
          </script>
          <style type="text/css">
            .my-img {
              opacity: 0;
              transition: opacity 5.0s linear;
            }
            .loaded {
              opacity: 1;
            }
          </style>
          <img src="images/fpo-he-man.jpg" bt-add-class-on-load="loaded" class="my-img"/>
        </doc:source>
      </doc:example>
   * 
   */
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
})(angular.module('boomstrap'));
