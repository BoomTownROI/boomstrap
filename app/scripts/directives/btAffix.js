(function(Boomstrap) {
  'use strict';

  Boomstrap.directive('btAffix', function($window) {
    return {
      template: '<div class="bt-affix" ng-transclude></div>',
      transclude: true,
      restrict: 'A',
      link: function (scope, element, attrs) {
        var windowEl     = angular.element($window),
            $element     = angular.element(element),
            $realElement = angular.element($element.children()[0]),
            defaults     = {
              'position': $element.css('position'),
              'top': $element.css('top'),
              'overflow-y': $element.css('overflow-y')
            };
            // jQuery 1.9 feature and above, not using
            //$element.css(['position', 'top', 'overflow-y']);

            // Not attaching these to scope makes the last fromTop/isAffixed
            //   declared shared across all directives

        // Referencing $element directly.  Revisit if different affixes on the page become an issue
        //scope.fromTop      = $element.offset().top;
        scope.isAffixed    = false;

        defaults.width = 'auto';

        scope.offset = 0;

        var affixThis = function() {
          var myWidth = $realElement.css('width');
          var myHeight = $realElement.height();
          $realElement.css({
            'position': 'fixed',
            'top': '' + scope.offset + 'px',
            'width': myWidth, // Maintain the width of the div before it was fixed
            'max-height': '100%'
          });

          if (scope.scroll) {
            $realElement.css({
              'overflow-y': 'scroll'
            });
          }

          if (scope.fullHeight) {
            $realElement.css({
              'height': '100%'
            });
          }

          if (scope.pinnedHeader) {
            $realElement.css({
              'top': 0,
              'width': '100%',
              'left': 0
            }).addClass('pinned-header');
          }

          $element.addClass('is-bt-affixed').css({
            'height': myHeight
          });

          scope.isAffixed = true;
        };

        var unAffixThis = function() {
          $realElement.scrollTop(0);
          $realElement.css(defaults);
          $realElement.css({'height': 'auto'});

          $element.removeClass('is-bt-affixed').css({
            'height': 'auto'
          });
          $realElement.removeClass('pinned-header');
          scope.isAffixed = false;
        };

        var scroller = function() {
          if (windowEl.scrollTop() > $element.offset().top - scope.offset) {
            if (!scope.isAffixed) {
              affixThis();
            }
          } else {
            if (scope.isAffixed) {
              unAffixThis();
            }
          }
        };

        var resizer = function() {
          // The width of the sidebar will be off
          if (scope.isAffixed) {
            unAffixThis();
            affixThis();
          }
        };

        attrs.$observe('offset', function(val) {
          if (angular.isDefined(val)) {
            scope.offset = parseInt(val, 10);
          }
        });

        windowEl.on('scroll.affix', scroller);
        windowEl.on('resize.affix', resizer);

        attrs.$observe('scroll', function(val) {
          scope.scroll = !!val;
        });

        attrs.$observe('fullHeight', function(val) {
          scope.fullHeight = !!val;
        });

        attrs.$observe('pinnedHeader', function(val) {
          scope.pinnedHeader = !!val;
        });

        scope.$on('destroy', function() {
          windowEl.off('scroll.affix', scroller);
          windowEl.off('resize.affix', resizer);
        });
      }
    };
  });
})(angular.module('Boomstrap'));
