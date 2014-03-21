(function() {
  'use strict';

  angular.module('PatternLibrary', [
    'ui.bootstrap',
    'angular-chosen'
  ]);
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
})(angular.module('PatternLibrary'));

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
      image: 'images/he-man.jpg',
      text: 'Skeletor!?'
    });
  }]);
})(angular.module('PatternLibrary'));
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
})(angular.module('PatternLibrary'));
(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('PopoverDemoCtrl', ['$scope', function PopoverDemoCtrl($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }]);
})(angular.module('PatternLibrary'));
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
})(angular.module('PatternLibrary'));

(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('TooltipDemoCtrl', ['$scope', function TooltipDemoCtrl($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I&#x27;ve been made &lt;b&gt;bold&lt;/b&gt;!';
  }]);
})(angular.module('PatternLibrary'));

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
})(angular.module('PatternLibrary'));
/* GLOBAL JS */
