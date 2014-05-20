(function() {
  'use strict';

  module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    /*
     * These grunt tasks are for what gulp doesn't have, or sucks at.
     */
    grunt.initConfig({

      'gh-pages': {
        options: {
          base: 'docs'
        },
        src: ['**']
      },

      ngdocs: {
        options: {
          dest: 'docs/angularapi',
          scripts: [
            'docs/js/boomstrap.js',
            'docs/js/boomstrap-angular.js',
            'bower_components/angular-animate/angular-animate.min.js'
          ],
          styles: [
            '//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700',
            'docs/css/boomstrap.css'
          ],
          html5Mode: false,
          animate: false,
          startPage: '/ngboomstrap',
          image: 'docs/images/fpo-boomstrap-logo.png',
          imageLink: '/index.html',
          navTemplate: 'views/partials/ngdocs-nav.html'
        },
        ngboomstrap: {
          src: ['docs/js/boomstrap-angular.js'],
          title: 'boomstrap'
        }
      }
    });
  };
})();