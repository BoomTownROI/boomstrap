(function(Boomstrap, baron) {
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
    return function(scope, element, attrs) {
      var $element = angular.element(element);
      $element.addClass('scroller');
      $element.baron();
    };
  })
})(angular.module('Boomstrap'), window.baron);