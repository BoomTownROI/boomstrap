(function(Boomstrap, baron) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btScrollBar
   * @restrict A
   *
   * @param {Number} totalItems The number of items to paginate through.
   * @param {Number} currentPage The number of the current page we are on.
   * @param {Number} itemsPerPage How many items are allowed on each page.
   *
   * @description
   * The `btScrollBar` directive adds a simulated scroll-bar to any element.  It wraps the jQuery baron library.
   */
  Boomstrap.directive('btScrollBar', function() {
    return function(scope, element) {
      var $element = angular.element(element);

      $element.addClass('scroller baron');
      $element.append('<div class="scroller__track"><div class="scroller__bar"></div></div>');

      var scroller = baron({
        root: element[0],
        scroller: '.scroller',
        bar: '.scroller__bar',
        track: '.scroller__track',
        $: angular.element
      });

      $element.bind('resize', function() {
        scroller.update();
      });

      scope.$on('$destroy', function() {
        scroller.dispose();
      });
    };
  });
})(angular.module('boomstrap'), window.baron);
