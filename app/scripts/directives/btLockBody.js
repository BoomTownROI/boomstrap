(function(Boomstrap) {
  'use strict';
  /*
   * btLockBody will add overflow: hidden to the body when this element exists.
   * It will also remove it when the element is destroyed.
   */
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btLockBody
   * @requires $document
   * @requires $window
   * @restrict A
   *
   * @description The `btLockBody` attribute directive will prevent the body from scrolling whenever
   * the element this directive is attached to exists.  This is used for an older version of Angular
   * Bootstrap in which invoking a modal would not lock the body from scrolling.  Use ng-if with this
   * directive to make sure the body is not locked all of the time.
   *
   */
  Boomstrap.directive('btLockBody', function($document, $window) {
    return {
      link: function(scope, element) {
        var $body = angular.element(document.getElementsByTagName('body')[0]);
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        var $documentEl = angular.element($document);
        var $windowEl = angular.element($window);
        var htmlDefault = {
          position: $html.css('position'),
          'overflow-y': $html.css('overflow-y'),
          'width': $html.css('width'),
          isScrolled: false
        };
        var scrollTop;

        if ($document.height() > $windowEl.height()) {
          // http://stackoverflow.com/questions/8701754/just-disable-scroll-not-hide-it
          // Works for Chrome, Firefox, IE...
          scrollTop = $html.scrollTop() || $body.scrollTop();
          $html.css('top',-scrollTop);

          htmlDefault.isScrolled = true;
        }

        $html.css('position', 'fixed');
        $html.css('overflow-y', 'scroll');
        $html.css('width', '100%');


        element.bind('$destroy', function() {
          $html.css('position', htmlDefault.position);
          $html.css('overflow-y', htmlDefault['overflow-y']);
          $html.css('width', htmlDefault.width);

          if (htmlDefault.isScrolled) {
            $html.scrollTop(scrollTop);
            $body.scrollTop(scrollTop);
          }
        });
      }
    };
  });
})(angular.module('boomstrap'));