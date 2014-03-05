module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js', // jQuery JS
          'bower_components/bootstrap/dist/js/bootstrap.js', // Bootstrap JS
          'js/libs/*.js', // Libraries JS
          'js/pattern-library.js'  // Pattern Library JS
        ],
        dest: 'dist/js/pattern-library.js',
      },
      docs: {
        src: [
          'bower_components/jquery/dist/jquery.js', // jQuery JS
          'bower_components/bootstrap/dist/js/bootstrap.js', // Bootstrap JS
          'js/libs/*.js', // Libraries JS
          'js/pattern-library.js'  // Pattern Library JS
        ],
        dest: 'docs/js/pattern-library.js',
      }
    },
    uglify: {
      build: {
        src: 'dist/js/pattern-library.js',
        dest: 'dist/js/pattern-library.min.js'
      },
      docs: {
        src: 'docs/js/pattern-library.js',
        dest: 'docs/js/pattern-library.min.js'
      }
    },
    less: {
      dev: {
        options: {
          compress: false
        },
        files: {
          'dist/css/pattern-library.css':'less/pattern-library.less',
          'dist/css/_docs.css':'less/_docs.less'
        }
      },
      dist: {
        options: {
          compress: true
        },
        files: {
          'dist/css/pattern-library.css':'less/pattern-library.less',
          'dist/css/_docs.css':'less/_docs.less'
        }
      },
      docs: {
        options: {
          compress: true
        },
        files: {
          'docs/css/pattern-library.css':'less/pattern-library.less',
          'docs/css/_docs.css':'less/_docs.less'
        }
      }
    },
    copy: {
      docs: {
        src: 'index.html',
        dest: 'docs/'
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['less/*.less'],
        tasks: ['less:dev'],
        options: {
            spawn: false,
        }
      }
    },
    connect: {
      docs: {
        options: {
          hostname: 'localhost',
          port: 9000,
          open: true,
          base: 'docs',
          keepalive: true
        }
      }
    }
  });

  // Read the dependencies/devDependencies/peerDependencies in package.json & load grunt tasks.

  require('load-grunt-tasks')(grunt);

  // Tell Grunt what to do when we type "grunt" into the terminal.

  grunt.registerTask('css', ['less:dev']); // Development
  grunt.registerTask('dev', ['concat:dist','uglify:build','less:dev']); // Development
  grunt.registerTask('dist', ['concat:dist','uglify:build','less:dist']); // Distribution
  grunt.registerTask('server', ['concat:docs', 'uglify:docs', 'less:docs', 'copy:docs', 'connect']);
  grunt.registerTask('default', ['concat:dist','uglify:build','less:dist']);

};






