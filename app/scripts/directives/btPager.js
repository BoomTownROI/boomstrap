(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btPager
   * @restrict E
   * 
   * @param {Number} totalPages The number of pages to track through.
   * @param {Number} currentPage The number of the current page we are on.
   *
   * @description
   * The `btPager` directive is a wrapper of the ui-bootstrap pagination directive that keeps
   * track of what page we are on and programmatically disable or enable pagination based on such.
   * It is wrapping the directive so that we can provide our own template.
   *
   * @example
      <doc:example module="boomstrap">
        <doc:source>
          <script>
          angular.module('boomstrap').controller('pagerTest', function($scope) {
            $scope.currentPage = 7;
            $scope.totalPages = 14;
          })
          </script>
          <div ng-controller="pagerTest">
            <bt-pager currentPage="currentPage" totalPages="totalPages"></bt-pager>
            <pre>Page: {{currentPage}} / {{totalPages}}</pre>
          </div>
        </doc:source>
      </doc:example>
   * 
   */
  Boomstrap.directive('btPager', function() {
    return {
      restrict: 'E',
      // replace: true,
      templateUrl: 'template/btPager/bt-pager.tpl.html',
      scope: {
        currentPage: '=',
        totalItems: '=totalPages'
      }
    };
  });
})(angular.module('boomstrap'));