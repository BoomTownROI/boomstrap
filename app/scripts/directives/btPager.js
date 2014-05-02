(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btPager
   * @restrict E
   * 
   * @param {Number} totalItems The number of items to paginate through.
   * @param {Number} currentPage The number of the current page we are on.
   * @param {Number} itemsPerPage How many items are allowed on each page.
   *
   * @description
   * The `btPager` directive is a wrapper of the ui-bootstrap pagination directive that keeps
   * track of what page we are on and programmatically disable or enable pagination based on such.
   * It is wrapping the directive so that we can provide our own template.
   *
   */
  Boomstrap.directive('btPager', function() {
    return {
      restrict: 'E',
      // replace: true,
      templateUrl: 'template/btPager/bt-pager.tpl.html',
      scope: {
        currentPage: '=',
        totalItems: '=',
        itemsPerPage: '='
      }
    };
  });
})(angular.module('boomstrap'));