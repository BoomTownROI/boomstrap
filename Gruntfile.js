module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js', // jQuery JS
          'bower_components/bootstrap/dist/js/bootstrap.js', // Bootstrap JS
          'js/libs/*.js', // Libraries JS
          'js/global.js'  // Global JS
        ],
        dest: 'dist/js/pattern-library.js',
      },
      docs: {
        src: [
          'bower_components/jquery/dist/jquery.js', // jQuery JS
          'bower_components/bootstrap/dist/js/bootstrap.js', // Bootstrap JS
          'js/libs/*.js', // Libraries JS
          'js/global.js'  // Global JS
        ],
        dest: 'docs/js/pattern-library.js',
      }
    },
    uglify: {
      dist: {
        src: 'dist/js/pattern-library.js',
        dest: 'dist/js/pattern-library.min.js'
      },
      docs: {
        src: 'docs/js/pattern-library.js',
        dest: 'docs/js/pattern-library.min.js'
      }
    },
    less: {
      dist: {
        options: {
          compress: true
        },
        files: {
          'dist/css/pattern-library.css':'less/pattern-library.less',
          'dist/css/pattern-library-docs.css':'less/pattern-library-docs.less'
        }
      },
      docs: {
        options: {
          compress: false
        },
        files: {
          'docs/css/pattern-library.css':'less/pattern-library.less',
          'docs/css/pattern-library-docs.css':'less/pattern-library-docs.less'
        }
      }
    },
    copy: {
      // copy index.html and images directory into two locations
      dist: {
        files: [
          {src: ['index.html'], dest: 'dist/'},
          {src: ['images/**'], dest: 'dist/'}
        ]
      },
      docs: {
        files: [
          {src: ['index.html'], dest: 'docs/'},
          {src: ['images/**'], dest: 'docs/'}
        ]
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
        tasks: ['less:dist','less:docs'],
        options: {
          spawn: false,
        }
      },
      src: {
        files: ['index.html'],
        tasks: ['copy:docs'],
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

  grunt.registerTask('css', ['less:dist','less:docs']); // Just output the CSS
  grunt.registerTask('server', ['concat:docs', 'uglify:docs', 'less:docs', 'copy:docs', 'connect']); // Run server
  grunt.registerTask('default', ['concat:dist','concat:docs','uglify:dist','uglify:docs','less:dist',
    'less:docs','copy:dist','copy:docs']); // Full Monty

};






