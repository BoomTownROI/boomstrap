(function(Boomstrap) {
  'use strict';
  Boomstrap.controller('templatePopoverPopupCtrl', function($scope) {
    this.close = function($event) {
      if ($event && $event.stopPropagation) {
        $event.stopPropagation();
      }
      $scope.$parent.close();
    };
  })

  .directive('templatePopoverPopup', function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        title: '@',
        content: '@',
        placement: '@',
        animation: '&',
        isOpen: '&'
      },
      templateUrl: 'template/popover/template-popover.html',
      controller: 'templatePopoverPopupCtrl',
      controllerAs: '$popover'
    };
  })

  .controller('templatePopoverCtrl', function($scope) {
    $scope.close = function() {
      $scope.tt_isOpen = false;
    };
  })

  .directive('templatePopover', [ '$tooltip', function ($tooltip) {
    var toolTip = $tooltip('templatePopover', 'templatePopover', 'click');
    toolTip.controller = 'templatePopoverCtrl';
    return toolTip;
  }]);

})(angular.module('boomstrap'));