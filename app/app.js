(function() {
  'use strict';

  angular.module('PatternLibrary', [
    'ui.bootstrap',
    'angular-chosen'
  ])
  .constant('FEATURE_INTRO_TYPE', bestFitGlobal.featureIntroType)
  .value('AUTO_START_TOUR', {
    value: bestFitGlobal.autoStartTour
  });
})();
