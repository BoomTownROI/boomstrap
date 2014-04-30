(function() {
  'use strict';

  angular.module('boomstrap', [
    'ui.bootstrap',
    'angular-chosen'
  ])
  .value('AUTO_START_TOUR', {
    value: false
  });

  angular.module('ui.bootstrap.pagination')
  .config(function($provide) {
    $provide.decorator('paginationDirective', function($delegate) {
      var defaultURL = $delegate[0].templateUrl;
      $delegate[0].templateUrl = function(tElement, tAttrs) {
        return angular.isDefined(tAttrs.btPager) ? 'template/pagination/bt-pager.html' : defaultURL;
      };

      return $delegate;
    })
  });
})();
