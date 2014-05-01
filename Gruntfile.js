(function() {
  'use strict';

  module.exports = function (grunt) {

    var Mustache = require('mustache');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-concurrent');

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var fs = require('fs');
    var views = grunt.file.readJSON('views/views.json');

    var isObject = function(obj) {
      return obj === Object(obj);
    };

    var docs = [
      'ngtemplates',
      'jshint:all',
      'concurrent:concatjs',
      'ngmin',
      'concurrent:stylescripts',
      'copy:docs',
      'ngdocs',
      'copy:ngdocs',
      'clean:tmp'
    ];

    var htmlConcat = function() {
      var copyList = [];

      Object.keys(views).forEach(function(key) {
        var src = views[key],
            sources = [],
            idLinks = [];

        // If value is an object
        // Handle the list as a sub_nav list
        if (!Array.isArray(src)) {
        // create headers with their own titles

          var headerTemplate = grunt.file.read('views/partials/header.html');
          var headerSavePath = [
            '.tmp/headers/', 
            key,
            '.html'
          ].join('');


          // Populate the navigation template
          // Save it to a temporary directory
          // Add it to the sources for concatenation
          var pageHeader = Mustache.render(headerTemplate, {
            page_title: src.header
          });

          grunt.file.write(headerSavePath, pageHeader);
          sources.push(headerSavePath);

          // Retrieve the ids and Headers
          // for each item we are concatenating
          src.sources.forEach(function(view) {
            if (view.css_id && view.nav_header) {
              idLinks.push({
                css_id: view.css_id,
                nav_header: view.nav_header
              });
            }

            sources.push(view.source);
          });

          // create custom subnav per page

          var navTemplate = grunt.file.read('views/partials/sub_nav.tpl.html');
          var navSavePath = [
            '.tmp/footers/', 
            key,
            '.html'
          ].join('');


          // Populate the navigation template
          // Save it to a temporary directory
          // Add it to the sources for concatenation
          var subNav = Mustache.render(navTemplate, {
            header: src.header,
            link: idLinks
          });

          grunt.file.write(navSavePath, subNav);
          sources.push(navSavePath);
        } else {
          // Otherwise, handle the array
          // as a list of strings
          sources = views[key];
        }

        copyList.push({
          src: sources,
          dest: 'docs/' + key + '.html'
        });
      });

      return {
        files: copyList,
        options: {
          footer: grunt.file.read('views/partials/footer.html')
        }
      };
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

      // Project settings
      yeoman: {
        // configurable paths
        app: 'app',
        dist: 'dist',
        docs: 'docs',
        tmp: '.tmp'
      },

      // Watches files for changes and runs tasks based on the changed files
      watch: {
        options: {
          livereload: {
            port: 9000
          }
        },
        js: {
          files: ['<%= yeoman.app %>/**/{,*/}*.js', '<%= yeoman.app %>/**/{,*/}*.html'],
          tasks: docs
        },
        views: {
          files: ['views/**/*.html'],
          tasks: docs
        },
        less: {
          files: ['less/*.less'],
          tasks: ['less:docs']
        },
        gruntfile: {
          files: ['Gruntfile.js'],
          tasks: docs
        }
      },

      'gh-pages': {
        options: {
          base: 'docs'
        },
        src: ['**']
      },

      less: {
        dist: {
          options: {
            compress: true
          },
          files: {
            '<%= yeoman.dist %>/css/boomstrap.css':'less/boomstrap.less'
           }
        },
        docs: {
          options: {
            compress: false
          },
          files: {
            '<%= yeoman.docs %>/css/boomstrap.css':'less/boomstrap.less',
            '<%= yeoman.docs %>/css/boomstrap-docs.css':'less/boomstrap-docs.less'
          }
        }
      },

      csso: {
        compress: {
          files: {
              '<%= yeoman.dist %>/css/boomstrap.css': ['<%= yeoman.dist %>/css/boomstrap.css']
          }
        }
      },


      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
        options: {
          jshintrc: true,
          reporter: require('jshint-stylish')
        },
        all: {
          src: [
            'Gruntfile.js',
            '<%= yeoman.app %>/scripts/**/*.js'
          ]
        }
      },

      // Empties folders to start fresh
      clean: {
        dist: {
          files: [{
            dot: true,
            src: [
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }]
        },
        tmp: {
          files: [{
            dot: true,
            src: ['.tmp']
          }]
        }
      },

      concat: {
        'BoomstrapLib': {
          files: [{
            src: [
              'bower_components/jquery/dist/jquery.js',
              'bower_components/bootstrap/dist/js/bootstrap.min.js',
              'bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js',
              'bower_components/bootstrap-select/bootstrap-select.js',
              'bower_components/angular/angular.js',
              'bower_components/angular/angular-animate.js',
              'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
              'vendor/chosen_v1.1.0/chosen.jquery.min.js',
              'bower_components/angular-chosen/angular-chosen.js',
              'bower_components/angular-ui-select/dist/select.js',
              'bower_components/angular-chosen/angular-perfect-scrollbar.js',
              'js/global.js'
            ],
            dest: '<%= yeoman.tmp %>/js/boomstrap.js'
          }]
        },
        'BoomstrapAngular': {
          files: [{
            src: [
              '<%= yeoman.app %>/app.js',
              '<%= yeoman.app %>/scripts/**/*.js',
              '<%= yeoman.tmp %>/templates.js',
              '<%= yeoman.tmp %>/bootstrap-templates.js'
            ],
            dest: '<%= yeoman.tmp %>/js/boomstrap-angular.js'
          }]
        },
        html: htmlConcat()
      },

      uglify: {
        options: {
          mangle: false,
          sourceMap: true
        },
        'BoomstrapLib': {
          files: [
            {
              src: '<%= yeoman.tmp %>/js/boomstrap.js',
              dest: '<%= yeoman.tmp %>/js/boomstrap.min.js'
            }
          ]
        },
        'BoomstrapAngular': {
          files: [
            {
              src: '<%= yeoman.tmp %>/js/boomstrap-angular.js',
              dest: '<%= yeoman.tmp %>/js/boomstrap-angular.min.js',
            }
          ]
        }
      },

      // Allow the use of non-minsafe AngularJS files. Automatically makes it
      // minsafe compatible so Uglify does not destroy the ng references
      ngmin: {
        'Boomstrap': {
          files: [{
            expand: true,
            cwd: '<%= yeoman.tmp %>/js/',
            src: ['boomstrap-angular.js'],
            dest: '<%= yeoman.tmp %>/js/'
          }]
        },
      },

      ngtemplates: {
        'boomstrap': {
          cwd: '<%= yeoman.app %>',
          src: ['template/**/*.html', '!template/pagination/**/*'],
          dest: '<%= yeoman.tmp %>/templates.js',
          options: {
            htmlmin: {
              collapseWhitespace: true,
              removeComments:     true // Only if you don't use comment directives!
            }
          }
        },
        'ui.bootstrap.pagination': {
          cwd: '<%= yeoman.app %>',
          src: ['template/pagination/*.html'],
          dest: '<%= yeoman.tmp %>/bootstrap-templates.js',
          options: {
            htmlmin: {
              collapseWhitespace: true,
              removeComments:     true // Only if you don't use comment directives!
            }
          }

        }
      },

      connect: {
        docs: {
          options: {
            hostname: 'localhost',
            port: 9000,
            open: false,
            base: 'docs',
            keepalive: false
          }
        }
      },

      copy: {
        dist: {
          files: [
            {src: ['icons/**'], dest: '<%= yeoman.dist %>/css/'},
            {src: ['fonts/**'], dest: '<%= yeoman.dist %>/css/'},
            {
              dot: true,
              expand: true,
              cwd: '<%= yeoman.tmp %>/js/',
              src: ['*.js', '*.map'],
              dest: '<%= yeoman.dist %>/js/'
            }
          ]
        },
        docs: {
          files: [
            {src: ['favicon.ico'], dest: '<%= yeoman.docs %>/'},
            {src: ['images/**'], dest: '<%= yeoman.docs %>/'},
            {src: ['fonts/**'], dest: '<%= yeoman.docs %>/css/'},
            {src: ['icons/**'], dest: '<%= yeoman.docs %>/css/'},
            {
              dot: true,
              expand: true,
              cwd: '<%= yeoman.tmp %>/js/',
              src: ['*.js', '*.map'],
              dest: '<%= yeoman.docs %>/js/'
            }
          ]
        },
        ngdocs: {
          files: [{
            src: ['images/**'],
            dest: '<%= yeoman.docs %>/angularapi/'
          },
          {
            src: ['fonts/**', 'icons/**'],
            dest: '<%= yeoman.docs %>/angularapi/css/'
          }]
        }
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
            'docs/css/boomstrap.css',
            'docs/css/boomstrap-docs.css'
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
      },

      concurrent: {
        less: ['less:dist', 'less:docs'],
        copy: ['copy:dist', 'copy:docs'],
        uglify: ['uglify:BoomstrapLib', 'uglify:BoomstrapAngular'],
        stylescripts: ['concurrent:uglify', 'less:docs', 'concat:html'],
        concatjs: ['concat:BoomstrapLib', 'concat:BoomstrapAngular']
      }

    });

    grunt.registerTask('css', ['less:dist','less:docs']); // Just output the CSS

    grunt.registerTask('default', [
      'clean:dist',
      'ngtemplates',
      'concurrent:concatjs',
      'ngmin',
      'concurrent:uglify',
      'concurrent:less',
      'concurrent:copy',
      'clean:tmp'
    ]);
    grunt.registerTask('server', docs.concat(['connect', 'watch'])); // Run server
    grunt.registerTask('website', docs.concat(['gh-pages'])); // Build github pages
  };
})();