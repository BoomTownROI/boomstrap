(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btErrorImg
   * @restrict A
   * 
   * @param {string} btErrorImg URL to a backup image to be used if the src of an img tag fails to load.
   *
   * @description
   * The `btErrorImg` directive will replace the src of an img tag if the original src fails to load.
   * This is useful for images of properties.
   *
   * @element img
   *
   * @example
      <doc:example module="boomstrap">
        <doc:source>
          <img src="images/i-do-not-exist.jpg" bt-error-img="images/fpo-he-man.jpg"/>
        </doc:source>
      </doc:example>
   * 
   */
  Boomstrap.directive('btErrorImg', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          element.attr('src', attrs.btErrorImg);
        });
      }
    };
  });
})(angular.module('boomstrap'));