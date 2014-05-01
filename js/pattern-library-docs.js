(function() {
  'use strict';

  angular.module('boomstrap', [
    'ui.bootstrap',
    'angular-chosen'
  ])
  .value('AUTO_START_TOUR', {
    value: false
  });
})();

(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('AlertDemoCtrl', ['$scope', function AlertDemoCtrl($scope) {
    $scope.alerts = [
      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({msg: "Another alert!"});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  }]);
})(angular.module('boomstrap'));

(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
    slides.push({
      image: 'images/fpo-he-man.jpg',
      text: 'Skeletor!?'
    });
  }]);
})(angular.module('boomstrap'));
(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('ChosenDemoCtrl', ['$scope', function($scope) {
    $scope.superheroes = [
      'Batman',
      'Superman',
      'Green Arrow',
      'Wonder Woman'
    ];
    $scope.superhero = 'Spiderman';
  }]);
})(angular.module('boomstrap'));
(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('PopoverDemoCtrl', ['$scope', function PopoverDemoCtrl($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }]);
})(angular.module('boomstrap'));
(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('TabsDemoCtrl', ['$scope', function TabsDemoCtrl($scope) {
    $scope.tabs = [
      { title:"Dynamic Title 1", content:"Dynamic content 1" },
      { title:"Dynamic Title 2", content:"Dynamic content 2", disabled: true }
    ];

    $scope.alertMe = function() {
      setTimeout(function() {
        alert("You've selected the alert tab!");
      });
    };

    $scope.navType = 'pills';
  }]);
})(angular.module('boomstrap'));

(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('TooltipDemoCtrl', ['$scope', function TooltipDemoCtrl($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I&#x27;ve been made &lt;b&gt;bold&lt;/b&gt;!';
  }]);
})(angular.module('boomstrap'));

(function(app) {
  'use strict';

  app.directive('plNav', [function() {
    return {
      restrict: 'A',
      templateUrl: 'template/nav.html',
      replace: true,
      link: function (scope, elem, attrs) {
        console.log("Linked plNav directive.");
      }
    };
  }]);
})(angular.module('boomstrap'));
(function(PatternLibrary, Tour) {
  'use strict';
  PatternLibrary.service('bootstrapTourService', ['$templateCache', '$rootScope', '$http', 'AUTO_START_TOUR', function($templateCache, $rootScope, $http, AUTO_START_TOUR) {
    var tourRef;

    var tour = {
      init: function(steps, onStart, onNextStep, onDismiss, onComplete) {
        var tourSteps = [];
        angular.forEach(steps, function(step) {
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
      startTour: function(startingStep) {
        startingStep = startingStep || 0;
        var tourTemplate = $templateCache.get('template/popover/popover-bootstrap-tour.html');

        var wasHidden = tour.isHidden;
        tour.isHidden = false;

        // End existing tours
        if(tourRef && tourRef.ended && !tourRef.ended()) {
          tourRef.end();
        }

        var ngApply = function(fn) {
          return function() {
            // This could be called in a programmatic context so
            // Make sure we're not currently in an angular context first
            if(!$rootScope.$$phase) {
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
          onNext: ngApply(function() {
            tour.currentStep += 1;

            if (tour.onNextStep) {
              tour.onNextStep();
            }
          }),
          onPrev: ngApply(function() {
            tour.currentStep -= 1;
          }),
          onEnd: ngApply(function() {
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

        $rootScope.$on('$stateChangeStart', function() {
          if(tourRef && tourRef.ended && !tourRef.ended()) {
            // End the tour at the current step, but do not dismiss
            tour.endTour(true);
            AUTO_START_TOUR.value = false;
          }
        });
      },
      currentStep: -1,
      isHidden: false,
      shouldResume: function(val) {
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
      goToNextStep: function() {
        tourRef.next();
      },
      endTour: function(skipDismiss) {
        tourRef.end();
      }
    };

    return tour;
  }]);
})(angular.module('boomstrap'), window.Tour);
angular.module('boomstrap').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#pl-nav\"><span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">PL</a></div><div class=\"collapse navbar-collapse\" id=\"pl-nav\"><ul class=\"nav navbar-nav\"><li class=\"active\"><a href=\"#pl-colors\">Colors</a></li><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Buttons <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"#pl-button-options\">Options</a></li><li><a href=\"#pl-button-sizes\">Sizes</a></li><li><a href=\"#pl-button-active\">Active State</a></li><li><a href=\"#pl-button-disabled\">Disabled State</a></li><li><a href=\"#pl-button-tags\">Button Tags</a></li></ul></li><li><a href=\"#pl-labels\">Labels</a></li><li><a href=\"#pl-typography\">Typography</a></li></ul></div></div></nav><div class=\"container\"></div>"
  );


  $templateCache.put('template/popover/popover-bootstrap-tour.html',
    "<div class=\"popover tour-best-fit-leads\"><div class=\"arrow\"></div><div class=\"popover-close\"><i data-role=\"end\" class=\"ficon ficon-cross property-close\"></i></div><h3 class=\"popover-title\">New Best-Fit Leads Tour</h3><div class=\"tour-popover popover-content\"></div><div class=\"popover-navigation\"><button class=\"btn btn-default\" data-role=\"prev\">Prev</button> <button class=\"btn btn-default\" data-role=\"next\"><span>Next</span></button></div></div>"
  );

}]);

/* GLOBAL JS */


// Extend Bootstrap popover.js to add close button (http://jsfiddle.net/ConstantA/T3Xxh/)

$.fn.extend({
    popoverClosable: function (options) {
        var defaults = {
            template:
                '<div class="popover">\
<div class="arrow"></div>\
<div class="popover-close" data-dismiss="popover" aria-hidden="true"><i class="ficon ficon-cross" data-role="end"></i></div>\
<h3 class="popover-title"></h3>\
<div class="popover-content"></div>\
</div>'
        };
        options = $.extend({}, defaults, options);
        var $popover_togglers = this;
        $popover_togglers.popover(options);
        $popover_togglers.on('click', function (e) {
            e.preventDefault();
            $popover_togglers.not(this).popover('hide');
        });
        $('html').on('click', '[data-dismiss="popover"]', function (e) {
            $popover_togglers.popover('hide');
        });
    }
});

$(function () {
    $('[data-toggle="popover"]').popoverClosable();
});


// Add icons to Bootstrap collpase.js

/*$( document ).ready(function() {
  $('.panel-collapse.collapse').prev().find(".ficon").removeClass("ficon-chevron-up").addClass("ficon-chevron-down");
  $('.panel-collapse.collapse.in').prev().find(".ficon").removeClass("ficon-chevron-down").addClass("ficon-chevron-up");

  $('.panel-collapse').on('shown.bs.collapse', function () {
      $(this).prev().find(".ficon").removeClass("ficon-chevron-down").addClass("ficon-chevron-up");
  });

  $('.panel-collapse').on('hidden.bs.collapse', function () {
      $(this).prev().find(".ficon").removeClass("ficon-chevron-up").addClass("ficon-chevron-down");
  });
});*/










