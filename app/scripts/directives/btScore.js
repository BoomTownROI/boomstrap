(function(Boomstrap) {
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
            <p><bt-score score="myScore" size="xs"></bt-score></p>
            <p><bt-score score="myScore" size="sm"></bt-score></p>
            <p><bt-score score="myScore"></bt-score></p>
            <p><bt-score score="myScore" size="lg"></bt-score></p>
          </div>
        </doc:source>
      </doc:example>
   * 
   */
  Boomstrap.directive('btScore', function() {

    return {
      restrict: 'E',
      replace: true,
      template: '<span class="score {{ scoreSize }} {{ scoreType }}">{{ score }}</span>',
      scope: {
        score: '=',
        size: '@'
      },
      link: function(scope, iElement, iAttrs) {
        var translateScore = function(score) {
          var scoreType,
              scoreTranslation;

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

        scope.$watch('score', function(newScore, oldScore) {
          if (newScore !== oldScore) {
            translateScore(newScore);
          }
        });

        scope.$watch('size', function(newSize, oldSize) {
          if (newSize !== oldSize) {
            scope.scoreSize = newSize && 'score-' + newSize || '';
          }
        });

      }
    };
  });
})(angular.module('boomstrap'));