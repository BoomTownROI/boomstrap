(function () {
  'use strict';
  angular.module('boomstrap', [
    'ui.bootstrap',
    'angular-chosen'
  ]).value('AUTO_START_TOUR', { value: false });
}());
(function (boomstrap) {
  'use strict';
  boomstrap.controller('AlertDemoCtrl', [
    '$scope',
    function AlertDemoCtrl($scope) {
      $scope.alerts = [
        {
          type: 'danger',
          msg: 'Oh snap! Change a few things up and try submitting again.'
        },
        {
          type: 'success',
          msg: 'Well done! You successfully read this important alert message.'
        }
      ];
      $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
      };
      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };
    }
  ]);
}(angular.module('boomstrap')));
(function (boomstrap) {
  'use strict';
  boomstrap.controller('CarouselDemoCtrl', [
    '$scope',
    function ($scope) {
      $scope.myInterval = 5000;
      var slides = $scope.slides = [];
      $scope.addSlide = function () {
        var newWidth = 600 + slides.length;
        slides.push({
          image: 'http://placekitten.com/' + newWidth + '/300',
          text: [
            'More',
            'Extra',
            'Lots of',
            'Surplus'
          ][slides.length % 4] + ' ' + [
            'Cats',
            'Kittys',
            'Felines',
            'Cutes'
          ][slides.length % 4]
        });
      };
      for (var i = 0; i < 4; i++) {
        $scope.addSlide();
      }
      slides.push({
        image: 'images/fpo-he-man.jpg',
        text: 'Skeletor!?'
      });
    }
  ]);
}(angular.module('boomstrap')));
(function (boomstrap) {
  'use strict';
  boomstrap.controller('ChosenDemoCtrl', [
    '$scope',
    function ($scope) {
      $scope.superheroes = [
        'Batman',
        'Superman',
        'Green Arrow',
        'Wonder Woman'
      ];
      $scope.superhero = 'Spiderman';
    }
  ]);
}(angular.module('boomstrap')));
(function (boomstrap) {
  'use strict';
  boomstrap.controller('PopoverDemoCtrl', [
    '$scope',
    function PopoverDemoCtrl($scope) {
      $scope.dynamicPopover = 'Hello, World!';
      $scope.dynamicPopoverTitle = 'Title';
    }
  ]);
}(angular.module('boomstrap')));
(function (boomstrap) {
  'use strict';
  boomstrap.controller('TabsDemoCtrl', [
    '$scope',
    function TabsDemoCtrl($scope) {
      $scope.tabs = [
        {
          title: 'Dynamic Title 1',
          content: 'Dynamic content 1'
        },
        {
          title: 'Dynamic Title 2',
          content: 'Dynamic content 2',
          disabled: true
        }
      ];
      $scope.alertMe = function () {
        setTimeout(function () {
          alert('You\'ve selected the alert tab!');
        });
      };
      $scope.navType = 'pills';
    }
  ]);
}(angular.module('boomstrap')));
(function (boomstrap) {
  'use strict';
  boomstrap.controller('TooltipDemoCtrl', [
    '$scope',
    function TooltipDemoCtrl($scope) {
      $scope.dynamicTooltip = 'Hello, World!';
      $scope.dynamicTooltipText = 'dynamic';
      $scope.htmlTooltip = 'I&#x27;ve been made &lt;b&gt;bold&lt;/b&gt;!';
    }
  ]);
}(angular.module('boomstrap')));
(function (Boomstrap) {
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
      link: function (scope, element, attrs) {
        attrs.$observe('btAddClassOnLoad', function (attrClass) {
          element.bind('load', function () {
            element.addClass(attrClass);
          });
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btAffix
   * @requires  $window
   * @restrict A
   *
   * @description The `btAffix` element allows a user to affix an element at a given scroll point.
   * Another element with the same height and width will take the place of the element to ensure
   * that the page layout does not break upon affixing.
   *
   * @param {Number} offset Number of pixels to add to scroll before element is affixed
   * @param {bool} scroll Indicates if the affixed element is allowed to scroll
   * @param {bool} fullHeight Indicates that the affixed element spans the entire height of the page
   * @param {bool} pinnedHeader Indicates that the affixed element spans the entire width of the page and is affixed to the top left
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <div bt-affix offset="500">
            <img src="images/fpo-he-man.jpg"/>
          </div>
            <img src="images/fpo-he-man.jpg"/>
            <img src="images/fpo-he-man.jpg"/>
            <img src="images/fpo-he-man.jpg"/>
            <img src="images/fpo-he-man.jpg"/>
        </doc:source>
      </doc:example>
   */
  Boomstrap.directive('btAffix', function ($window) {
    return {
      template: '<div class="bt-affix" ng-transclude></div>',
      transclude: true,
      restrict: 'A',
      link: function (scope, element, attrs) {
        var windowEl = angular.element($window), $element = angular.element(element), $realElement = angular.element($element.children()[0]), defaults = {
            'position': $element.css('position'),
            'top': $element.css('top'),
            'overflow-y': $element.css('overflow-y')
          };
        scope.isAffixed = false;
        defaults.width = 'auto';
        scope.offset = 0;
        var affixThis = function () {
          var myWidth = $realElement.css('width');
          var myHeight = $realElement.height();
          $realElement.css({
            'position': 'fixed',
            'top': '' + scope.offset + 'px',
            'width': myWidth,
            'max-height': '100%'
          });
          if (scope.scroll) {
            $realElement.css({ 'overflow-y': 'scroll' });
          }
          if (scope.fullHeight) {
            $realElement.css({ 'height': '100%' });
          }
          if (scope.pinnedHeader) {
            $realElement.css({
              'top': 0,
              'width': '100%',
              'left': 0
            }).addClass('pinned-header');
          }
          $element.addClass('is-bt-affixed').css({ 'height': myHeight });
          scope.isAffixed = true;
        };
        var unAffixThis = function () {
          $realElement.scrollTop(0);
          $realElement.css(defaults);
          $realElement.css({ 'height': 'auto' });
          $element.removeClass('is-bt-affixed').css({ 'height': 'auto' });
          $realElement.removeClass('pinned-header');
          scope.isAffixed = false;
        };
        var scroller = function () {
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
        var resizer = function () {
          // The width of the sidebar will be off
          if (scope.isAffixed) {
            unAffixThis();
            affixThis();
          }
        };
        attrs.$observe('offset', function (val) {
          if (angular.isDefined(val)) {
            scope.offset = parseInt(val, 10);
          }
        });
        windowEl.on('scroll.affix', scroller);
        windowEl.on('resize.affix', resizer);
        attrs.$observe('scroll', function (val) {
          scope.scroll = !!val;
        });
        attrs.$observe('fullHeight', function (val) {
          scope.fullHeight = !!val;
        });
        attrs.$observe('pinnedHeader', function (val) {
          scope.pinnedHeader = !!val;
        });
        scope.$on('destroy', function () {
          windowEl.off('scroll.affix', scroller);
          windowEl.off('resize.affix', resizer);
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btArrowScroll', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var $windowEl = angular.element($window);
        var scrollDistance = 50;
        $windowEl.on('keydown.arrowscroll', function (e) {
          var scroll;
          // Handle down key
          if (e.keyCode === 40) {
            scroll = element.scrollTop();
            if (scroll + scrollDistance < element[0].scrollHeight) {
              element.scrollTop(scroll + scrollDistance);
              e.preventDefault();
            } else if (scroll !== element[0].scrollHeight) {
              // Scroll to the bottom if we're less than the scroll distance
              element.scrollTop(element[0].scrollHeight);
            }
          } else if (e.keyCode === 38) {
            // Handle up key
            scroll = element.scrollTop();
            if (scroll - scrollDistance >= 0) {
              element.scrollTop(scroll - scrollDistance);
              e.preventDefault();
            } else if (scroll !== 0) {
              // Scroll to the top if we're less than the scroll distance
              element.scrollTop(0);
            }
          }
        });
        element.bind('$destroy', function () {
          $windowEl.off('keydown.arrowscroll');
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name boomstrap.directive:btAutoSubmit
   * @restrict A
   *
   * @description `btAutoSubmit` allows you to auto submit a form whenever the model of a form-field changes.
   * This directive requires the `ngForm` directive to also be present on the element.
   * 
   *
   * @requires $timeout
   * @requires ngForm
   * @param {expression} ngSubmit Fires upon timeout completion
   * @param {expression} btAutoSubmit If the `expression` is truthy then the `ngSubmit` expression will fire upon timeout
   * @param {Number} submitTimeout Number of milliseconds to wait after a model change before firing the `ngSubmit`
   * @param {expression} willLoad This directive will set the value supplied here to true when it has scheduled the timeout, but not fired it
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <script>
            angular.module('boomstrap')
              .controller('subTest', function($scope) {
                $scope.willLoad = {
                  value: false
                };
                $scope.inputValue = 'Type here!';
                $scope.submit = function() {
                  $scope.delayedValue = $scope.inputValue;
                }
              });
          </script>
          <div ng-app="autoSubmitTest">
            <div ng-controller="subTest">
              <ng-form ng-submit="submit()" bt-auto-submit="true" submit-timeout="3000" will-load="willLoad">
                <input name="myName" ng-model="inputValue">
              </ng-form>
              <label ng-show="willLoad.value">I'm thinking...</label>
              <label ng-bind="delayedValue"></label>
            </div>
          </div>
        </doc:source>
      </doc:example> 
   */
  Boomstrap.directive('btAutoSubmit', function ($timeout) {
    return {
      require: 'form',
      restrict: 'A',
      scope: {
        'ngSubmit': '&',
        'shouldAutoSubmit': '=btAutoSubmit',
        'submitTimeout': '@',
        'willLoad': '='
      },
      link: function (scope, iElement, iAttrs, iCtrl) {
        var autoSubmit = parseInt(scope.submitTimeout, 10);
        var submitTimeout = $timeout(function () {
          }, 0);
        var triggerTimeout = function () {
          iCtrl.$setPristine();
          $timeout.cancel(submitTimeout);
          scope.willLoad.value = true;
          submitTimeout = $timeout(function () {
            scope.willLoad.value = false;
            if (iCtrl.$valid) {
              scope.ngSubmit({});
              iCtrl.$setPristine();
            }
          }, autoSubmit);
        };
        scope.$watch(function () {
          return iCtrl.$valid && iCtrl.$dirty;
        }, function (val, oldVal) {
          // We can programmatically determine when the form should auto submit
          if (scope.shouldAutoSubmit) {
            // If the form is both dirty and valid
            // Start the clock for submission
            if (val !== oldVal && val) {
              triggerTimeout();
            }
          } else {
            iCtrl.$setPristine();
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btCenterOnPage', function ($window, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var $element = angular.element(element), windowEl = angular.element($window);
        var centerElement = function () {
          var windowWidth = windowEl.width(), windowHeight = windowEl.height(), elementWidth = $element.width(), elementHeight = $element.height();
          $element.css({
            top: Math.floor((windowHeight - elementHeight) / 2).toString() + 'px',
            left: Math.floor((windowWidth - elementWidth) / 2).toString() + 'px'
          });
        };
        $timeout(centerElement, 0);
        windowEl.on('resize.modal', centerElement);
        scope.$on('$destroy', function () {
          windowEl.off('resize.modal');
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btDropdown', function ($window) {
    return {
      restrict: 'A',
      require: 'ngModel',
      templateUrl: 'template/dropdown/bt-dropdown.tpl.html',
      replace: true,
      scope: {
        values: '=',
        numberValues: '=',
        onAssign: '&'
      },
      link: function (scope, iElement, iAttrs, ngModel) {
        scope.dropdownChanged = false;
        var windowEl = angular.element($window);
        /* Because angular will only sort objects by their key and our key is
         * always a string representation, if we want to sort by numbers as a key
         * we need to transform the object into an array of objects in which the item we are sorting on
         * is the parseInt value of the key
         */
        var sortNumberValues = function (objectValues) {
          var sortedArray = [];
          angular.forEach(objectValues, function (item, key) {
            sortedArray.push({
              'key': key,
              'value': item
            });
          });
          sortedArray.sort(function (a, b) {
            return parseInt(a.key, 10) > parseInt(b.key, 10);
          });
          return sortedArray;
        };
        scope.arrayValues = sortNumberValues(scope.values);
        if (scope.numberValues) {
          scope.$watch('values', function (newValues, oldValues) {
            if (newValues && oldValues && newValues.length !== oldValues.length) {
              scope.arrayValues = sortNumberValues(scope.values);
            }
          });
        }
        scope.assignValue = function (value) {
          scope.selectedValue = scope.values[value];
          ngModel.$setViewValue(value);
          // Trigger dirty
          scope.dropdownChanged = true;
          // Trigger bt-dirty
          if (scope.onAssign) {
            scope.onAssign({
              ddValue: value,
              ddTranslation: scope.selectedValue
            });
          }
        };
        scope.valuesLength = function () {
          return scope.values && _.keys(scope.values).length || 0;
        };
        var setDropdownWidth = function () {
          scope.dropdownWidth = angular.element(iElement[0].children[0].children[0]).width();
        };
        setDropdownWidth();
        windowEl.on('resize.dropdown', function () {
          scope.$apply(setDropdownWidth);
        });
        scope.$on('$destroy', function () {
          windowEl.off('resize.dropdown');
        });
        var initialized = scope.$watch(function () {
            return ngModel.$modelValue;
          }, function (newVal, oldVal) {
            // Sometimes two $modelValue changes happen before a digest loop occurs
            // If we have yet to set a selectedValue, but newVal is truthy, go ahead and set it
            if (newVal !== oldVal || angular.isUndefined(scope.selectedValue) && (newVal || newVal === '')) {
              scope.selectedValue = scope.values[ngModel.$modelValue];
              initialized();
              // Now we can set up the watch for when an external force changes the model
              scope.$watch(function () {
                return ngModel.$modelValue;
              }, function (newVal, oldVal) {
                if (newVal !== oldVal && newVal && !angular.isUndefined(scope.selectedValue) && newVal !== scope.selectedValue) {
                  scope.selectedValue = scope.values[newVal];
                }
              });
            }
          });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btErrorImg', function () {
    return {
      link: function (scope, element, attrs) {
        element.bind('error', function () {
          element.attr('src', attrs.btErrorImg);
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btFocusOn', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var currentValue = { value: false };
        attrs.$observe('btFocusOn', function (newValue) {
          if (angular.isDefined(newValue)) {
            var newValBool = scope.$eval(newValue);
            // We are going from false to true
            if (!currentValue.value && newValBool) {
              // Defer to next digest loop
              // For cases of ng-show on an element
              // So that ng-show happens first
              $timeout(function () {
                element[0].focus();
              });
            }
            currentValue.value = newValBool;
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btFormatMoney', function ($filter) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, ele, attrs, ctrl) {
        var formatCurrency = function (input) {
          var currency = $filter('currency')(input);
          return currency.split('.')[0];
        };
        ctrl.$parsers.push(function (data) {
          //convert data from view format to model format
          var parsed;
          if (data) {
            parsed = parseInt(data.replace(/[^0-9]+/g, ''));
            if (isNaN(parsed)) {
              parsed = null;
            }
          } else {
            parsed = null;
          }
          //Force an update of the view value because angular is too smart to trigger $parsers a second time
          var newViewValue;
          if (parsed) {
            newViewValue = formatCurrency(parsed);
          } else {
            newViewValue = null;
          }
          if (newViewValue != data)
            ctrl.$setViewValue(newViewValue);
          //Only update the view (which triggers $parsers) if the new view value is actually different
          ctrl.$render();
          return parsed;  //converted value goes to the model
        });
        ctrl.$formatters.push(function (data) {
          //convert data from model format to view format
          if (data === null) {
            return null;
          }
          return formatCurrency(data);  //converted value goes to the view
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btIFrame', function ($window) {
    $window.iFrameCloseRegister = function () {
    };
    return {
      template: '<iframe ng-src="{{src}}" width="{{width}}" height="{{height}}" seamless onload="window.iFrameCloseRegister()"></iframe>',
      restrict: 'A',
      scope: {
        width: '@',
        height: '@',
        src: '=',
        closeFrame: '&'
      },
      link: function (scope, element) {
        $window.iFrameCloseRegister = function () {
          if (element.children()[0] && element.children()[0].contentWindow && element.children()[0].contentWindow.registerClose) {
            element.children()[0].contentWindow.registerClose(function () {
              scope.closeFrame();
            });
          }
        };
        scope.$on('$destroy', function () {
          $window.iFrameCloseRegister = function () {
          };
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btInfiniteScrollElement', function ($rootScope, $timeout) {
    return {
      link: function (scope, elem, attrs) {
        var checkWhenEnabled, handler, scrollEnabled, scrollDistance;
        scrollEnabled = true;
        checkWhenEnabled = false;
        scrollDistance = 30;
        // 30 is the default scroll distance
        attrs.$observe('infiniteScrollDistance', function (newVal, oldVal) {
          if (newVal !== oldVal && newVal) {
            scrollDistance = parseInt(newVal, 10);
            if (isNaN(scrollDistance)) {
              scrollDistance = 30;
            }
          }
        });
        handler = function () {
          var elementTotalHeight, elementScrollPosition, elementVisibleHeight, shouldScroll;
          // scrollHeight, scrollTop works for elements
          // overflow-y scroll too
          elementTotalHeight = elem[0].scrollHeight;
          elementScrollPosition = elem.scrollTop();
          elementVisibleHeight = elem.height();
          shouldScroll = elementTotalHeight - (elementVisibleHeight + elementScrollPosition) <= scrollDistance;
          if (shouldScroll && scrollEnabled) {
            if ($rootScope.$$phase) {
              return scope.$eval(attrs.btInfiniteScrollElement);
            } else {
              return scope.$apply(attrs.btInfiniteScrollElement);
            }
          } else if (shouldScroll) {
            checkWhenEnabled = true;
            return checkWhenEnabled;
          }
        };
        elem.on('scroll', handler);
        scope.$on('$destroy', function () {
          return elem.off('scroll', handler);
        });
        $timeout(function () {
          if (attrs.infiniteScrollImmediateCheck) {
            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
              return handler();
            }
          } else {
            return handler();
          }
        }, 0);
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /*
   * btLockBody will add overflow: hidden to the body when this element exists.
   * It will also remove it when the element is destroyed.
   */
  Boomstrap.directive('btLockBody', function ($document, $window) {
    return {
      link: function (scope, element) {
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
          $html.css('top', -scrollTop);
          htmlDefault.isScrolled = true;
        }
        $html.css('position', 'fixed');
        $html.css('overflow-y', 'scroll');
        $html.css('width', '100%');
        element.bind('$destroy', function () {
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
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  // http://stackoverflow.com/questions/19488884/angularjs-update-model-only-on-blur
  // http://plnkr.co/edit/mZyWw8?p=preview
  Boomstrap.directive('btNgModelOnblur', function ($analytics) {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attrs, ngModel) {
        var analyticsName = '';
        var reportAnalyticsChange = function (value) {
          if (!value && value !== 0) {
            value = 'Empty';
          }
          $analytics.eventTrack(value, {
            category: 'BestFitLeads2.0',
            label: analyticsName + ' manual entry'
          });
        };
        var update = function (alwaysUpdate) {
          scope.$apply(function () {
            var elementValue = element.val().trim();
            if (!alwaysUpdate) {
              var modelEmpty = angular.isUndefined(ngModel.$modelValue) || ngModel.$modelValue === null;
              // We don't care about blank values not changing
              if (modelEmpty) {
                if (elementValue === '') {
                  return;
                }
              } else {
                var normalizedValue = elementValue.replace(/[^.0-9]+/g, '');
                if (normalizedValue !== '') {
                  normalizedValue = /\./.test(normalizedValue) ? parseFloat(normalizedValue, 10) : parseInt(normalizedValue, 10);
                  // Check the numbers and if they're equal, abort!
                  if (normalizedValue === ngModel.$modelValue) {
                    return;
                  }
                }
              }
            }
            ngModel.$setViewValue(elementValue);
            ngModel.$render();
            reportAnalyticsChange(ngModel.$modelValue);
          });
        };
        element.off('input').off('keydown').off('change').on('blur', function () {
          update(false);
        }).on('keydown', function (e) {
          if (e.keyCode === 13) {
            update(true);
          }
        });
        // Code to set pristine on focus
        // .on('focus', function () {
        //   scope.$apply(function () {
        //     ngModel.$setPristine();
        //   });
        // })
        attrs.$observe('btNgModelOnblur', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            analyticsName = newVal;
          }
        });
        // Remove bindings when the scope is destroyed
        scope.$on('$destroy', function () {
          element.unbind();
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  Boomstrap.directive('btNumber', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, iElement, iAttrs, modelCtrl) {
        modelCtrl.$parsers.push(function (data) {
          if (data) {
            // Basically, don't allow the user to type in anything other than a number or decimal
            var parsed = data.toString().replace(/[^0-9.]+/g, '');
            if (parsed) {
              parsed = /\./.test(data) ? parseFloat(data) : parseInt(data);
            }
            if (parsed != data) {
              //Only update the view if the new view value is actually different
              modelCtrl.$setViewValue(parsed);
              modelCtrl.$render();
            }
            return parsed;
          }
          return data;
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btRange', function ($analytics, $window, $timeout) {
    var DEFAULT_DROPMIN = -1;
    var DEFAULT_DROPMAX = -1;
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: function (tElement, tAttrs) {
        // Set the template to number by default
        var templateUrl = 'template/range/bt-range-number.tpl.html';
        if (tAttrs && tAttrs.rangeType) {
          var rangeType = tAttrs.rangeType;
          if (rangeType === 'money') {
            templateUrl = 'template/range/bt-range-money.tpl.html';
          }
        }
        return templateUrl;
      },
      replace: true,
      scope: {
        header: '@',
        values: '='
      },
      link: function (scope, iElement, iAttrs, iCtrl) {
        scope.dropdown = {
          dropmin: DEFAULT_DROPMIN,
          dropmax: DEFAULT_DROPMAX
        };
        scope.minimum = iCtrl.$modelValue.minimum;
        scope.maximum = iCtrl.$modelValue.maximum;
        var $element = angular.element(iElement), windowEl = angular.element($window);
        var validateMinMax = function (flippingFn) {
          var valid = true;
          // Normalize values first
          if (!angular.isNumber(scope.minimum)) {
            scope.minimum = null;
          }
          if (!angular.isNumber(scope.maximum)) {
            scope.maximum = null;
          }
          if (scope.maximum !== null && scope.minimum !== null && scope.maximum < scope.minimum && flippingFn) {
            flippingFn();
          }
          // Ranges would formerly be invalid
          // if the minimum was greater than the maximum or if either was null
          // this is no longer the case
          return valid;  // return valid && scope.minimum <= scope.maximum;
        };
        var setDropdownWidths = function () {
          scope.minDropdownWidth = $element.find('.range-min').outerWidth(true);
          scope.maxDropdownWidth = $element.find('.range-max').outerWidth(true);
          scope.inputWidth = $element.find('input').outerWidth(true);
        };
        setDropdownWidths();
        windowEl.on('resize.range', function () {
          scope.$apply(setDropdownWidths);
        });
        scope.$on('$destroy', function () {
          windowEl.off('resize.range');
        });
        scope.$watch(function () {
          return iCtrl.$modelValue.minimum;
        }, function (newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.minimum = iCtrl.$modelValue.minimum;
          }
        });
        scope.$watch(function () {
          return iCtrl.$modelValue.maximum;
        }, function (newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.maximum = iCtrl.$modelValue.maximum;
          }
        });
        // Do minimum and maximum validation here
        // We are separating minimum and maximum from the range object
        // So that we can have any watches on the range object fire only once
        scope.$watch('minimum', function (min, oldMin) {
          if (min !== oldMin) {
            iCtrl.$valid = validateMinMax(function () {
              // Pass in the flipping function if the min/max order is invalid.
              scope.maximum = scope.minimum;
            });
            iCtrl.$modelValue.minimum = scope.minimum;
            iCtrl.$setValidity('range', iCtrl.$valid);
            // Updating the view value will programmatically make this dirty
            // Only do this if we've just selected an item in the dropdown
            //  because typing in the field will set the dirty flag for us.
            if (angular.isDefined(oldMin) || scope.dropdown.dropmin !== DEFAULT_DROPMIN) {
              iCtrl.$setViewValue(iCtrl.$viewValue);
            }
          }
        });
        scope.$watch('maximum', function (max, oldMax) {
          if (max !== oldMax) {
            iCtrl.$valid = validateMinMax(function () {
              // Pass in the flipping function if the min/max order is invalid.
              scope.minimum = scope.maximum;
            });
            iCtrl.$modelValue.maximum = scope.maximum;
            iCtrl.$setValidity('range', iCtrl.$valid);
            // Updating the view value will programmatically make this dirty
            // Only do this if we've just selected an item in the dropdown
            //  because typing in the field will set the dirty flag for us.
            if (angular.isDefined(oldMax) || scope.dropdown.dropmax !== DEFAULT_DROPMAX) {
              iCtrl.$setViewValue(iCtrl.$viewValue);
            }
          }
        });
        scope.setDropMin = function (val) {
          var dropDownUsedBefore = scope.dropMinChanged;
          scope.dropMinChanged = true;
          scope.dropdown.dropmin = val;
          var updateValue = function () {
            var analyticsValue = 'No min';
            if (val === -1) {
              scope.minimum = null;
            } else {
              scope.minimum = /\./.test(val) ? parseFloat(val, 10) : parseInt(val, 10);
            }
            $analytics.eventTrack(analyticsValue, {
              category: 'BestFitLeads2.0',
              label: (scope.header || '') + ' min selection'
            });
          };
          // Timeout the first time so that bt-dirty triggers on change
          if (!dropDownUsedBefore) {
            $timeout(updateValue);
          } else {
            updateValue();
          }
        };
        scope.setDropMax = function (val) {
          var dropDownUsedBefore = scope.dropMaxChanged;
          scope.dropMaxChanged = true;
          scope.dropdown.dropmax = val;
          var updateValue = function () {
            var analyticsValue = 'No max';
            if (val === -1) {
              scope.maximum = null;
            } else {
              scope.maximum = /\./.test(val) ? parseFloat(val, 10) : parseInt(val, 10);
              analyticsValue = scope.maximum.toString();
            }
            $analytics.eventTrack(analyticsValue, {
              category: 'BestFitLeads2.0',
              label: (scope.header || '') + ' max selection'
            });
          };
          // Timeout the first time so that bt-dirty triggers on change
          if (!dropDownUsedBefore) {
            $timeout(updateValue);
          } else {
            updateValue();
          }
        };
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btScore
   * @restrict E
   * @replace
   * 
   * @param {Number} score The score to present in the component.  Classes will be added to the element to
   * color a score element based on how high or low the score is.  Excellent score (99-76); Good score (75-56);
   * Average score (50-26); Default score (25-0)
   * @param {string} [size=''] The size of the score. Valid sizes include: `xs` (extrasmall), `sm` (small), and `lg` (large).
   * If no size is specified, the score will be of medium size.
   *
   * @description
   * The `btScore` directive represents a score component from Boomstrap.  It will keep the color
   * and size up to date based on what is specified.
   *
   *
   * @example
      <doc:example module="boomstrap">
        <doc:source>
          <div ng-init="myScore=20">
            <label>Input a score here to see it reflected in the tags :</label>
            <input ng-model="myScore">
            <p><bt-score score="myScore" size="xs" /></p>
            <p><bt-score score="myScore" size="sm"/></p>
            <p><bt-score score="myScore" /></p>
            <p><bt-score score="myScore" size="lg"/></p>
          </div>
        </doc:source>
      </doc:example>
   * 
   */
  Boomstrap.directive('btScore', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<span class="score {{ scoreSize }} {{ scoreType }}">{{ score }}</span>',
      scope: {
        score: '=',
        size: '@'
      },
      link: function (scope, iElement, iAttrs) {
        var translateScore = function (score) {
          var scoreType, scoreTranslation;
          // Translate string value into a Number
          scoreTranslation = parseInt(score, 10);
          if (!isNaN(scoreTranslation)) {
            if (scoreTranslation >= 76) {
              scoreType = 'score-excellent';
            } else if (scoreTranslation >= 56) {
              scoreType = 'score-good';
            } else if (scoreTranslation >= 26) {
              scoreType = 'score-average';
            }
          }
          scope.scoreType = scoreType || '';
        };
        scope.scoreSize = scope.size && 'score-' + scope.size || '';
        scope.scoreType = translateScore(scope.score);
        scope.$watch('score', function (newScore, oldScore) {
          if (newScore !== oldScore) {
            translateScore(newScore);
          }
        });
        scope.$watch('size', function (newSize, oldSize) {
          if (newSize !== oldSize) {
            scope.scoreSize = newSize && 'score-' + newSize || '';
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap, Tour) {
  'use strict';
  Boomstrap.service('bootstrapTourService', function ($templateCache, $rootScope, $http, AUTO_START_TOUR) {
    var tourRef;
    var tour = {
        init: function (steps, onStart, onNextStep, onDismiss, onComplete) {
          var tourSteps = [];
          angular.forEach(steps, function (step) {
            if (step.template) {
              step.template = $templateCache.get(step.template);
            }
            if (!step.content && !step.title) {
              // Giving content a default value due to an issue
              // with bootstrap tour where a popover will not show
              // if both the content and the title is empty
              step.content = '.';
            }
            tourSteps.push(step);
          });
          tour.steps = tourSteps;
          tour.onStart = onStart;
          tour.onNextStep = onNextStep;
          tour.onDismiss = onDismiss;
          tour.onComplete = onComplete;
        },
        steps: [],
        startTour: function (startingStep) {
          startingStep = startingStep || 0;
          var tourTemplate = $templateCache.get('template/popover/popover-bootstrap-tour.html');
          var wasHidden = tour.isHidden;
          tour.isHidden = false;
          // End existing tours
          if (tourRef && tourRef.ended && !tourRef.ended()) {
            tourRef.end();
          }
          var ngApply = function (fn) {
            return function () {
              // This could be called in a programmatic context so
              // Make sure we're not currently in an angular context first
              if (!$rootScope.$$phase) {
                $rootScope.$apply(fn);
              } else {
                fn();
              }
            };
          };
          tourRef = new Tour({
            steps: tour.steps.slice(startingStep),
            template: tourTemplate,
            container: 'body',
            storage: false,
            onNext: ngApply(function () {
              tour.currentStep += 1;
              if (tour.onNextStep) {
                tour.onNextStep();
              }
            }),
            onPrev: ngApply(function () {
              tour.currentStep -= 1;
            }),
            onEnd: ngApply(function () {
              if (!tour.isHidden) {
                if (tour.currentStep === tour.steps.length - 1) {
                  // Tour is complete
                  if (tour.onComplete) {
                    tour.onComplete();
                  }
                } else {
                  // Tour is dismissed
                  if (tour.onDismiss) {
                    tour.onDismiss();
                  }
                }
              }
              tour.currentStep = -1;
            })
          });
          tourRef.init();
          tourRef.start(true);
          tour.currentStep = startingStep;
          if (!wasHidden && tour.onStart) {
            tour.onStart();
          }
          $rootScope.$on('$stateChangeStart', function () {
            if (tourRef && tourRef.ended && !tourRef.ended()) {
              // End the tour at the current step, but do not dismiss
              tour.endTour(true);
              AUTO_START_TOUR.value = false;
            }
          });
        },
        currentStep: -1,
        isHidden: false,
        shouldResume: function (val) {
          if (angular.isDefined(val)) {
            tour.isHidden = val;
            /*
           * shouldResume is assuming that the tour will start again
           * Because we are starting the tour in an intermediate state
           * the next step function will not be registered
           * Call the next step function here because of this
           */
            if (tour.onNextStep) {
              tour.onNextStep();
            }
          }
          return tour.isHidden;
        },
        goToNextStep: function () {
          tourRef.next();
        },
        endTour: function (skipDismiss) {
          tourRef.end();
        }
      };
    return tour;
  });
}(angular.module('boomstrap'), window.Tour));
angular.module('boomstrap').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel"><ol class="carousel-indicators" ng-show="slides().length > 1"><li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li></ol><div class="carousel-inner" ng-transclude=""></div><a class="left carousel-control" ng-click="prev()" ng-show="slides().length > 1"><span class="ficon ficon-chevron-left"></span></a> <a class="right carousel-control" ng-click="next()" ng-show="slides().length > 1"><span class="ficon ficon-chevron-right"></span></a></div>');
    $templateCache.put('template/nav.html', '<nav class="navbar navbar-default navbar-fixed-top" role="navigation"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#pl-nav"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">PL</a></div><div class="collapse navbar-collapse" id="pl-nav"><ul class="nav navbar-nav"><li class="active"><a href="#pl-colors">Colors</a></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Buttons <b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#pl-button-options">Options</a></li><li><a href="#pl-button-sizes">Sizes</a></li><li><a href="#pl-button-active">Active State</a></li><li><a href="#pl-button-disabled">Disabled State</a></li><li><a href="#pl-button-tags">Button Tags</a></li></ul></li><li><a href="#pl-labels">Labels</a></li><li><a href="#pl-typography">Typography</a></li></ul></div></div></nav><div class="container"></div>');
    $templateCache.put('template/popover/popover-bootstrap-tour.html', '<div class="popover tour-best-fit-leads"><div class="arrow"></div><div class="popover-close"><i data-role="end" class="ficon ficon-cross property-close"></i></div><h3 class="popover-title">New Best-Fit Leads Tour</h3><div class="tour-popover popover-content"></div><div class="popover-navigation"><button class="btn btn-default" data-role="prev">Prev</button> <button class="btn btn-default" data-role="next"><span>Next</span></button></div></div>');
  }
]);