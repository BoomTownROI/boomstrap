// cache(maybe for staticHost in ng)

var es = require('event-stream'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  ghPages = require('gulp-gh-pages'),
  mustache = require('gulp-mustache'),
  views = require('./views/views'),
  gutil = require('gulp-util');

gulp.task('default', function() {
  // 'concat:dist',
  // 'concat:docs',
  // 'uglify:dist',
  // 'uglify:docs',
  // 'less:dist',
  // 'less:docs',
  // 'copy:dist',
  // 'copy:docs'
});

var htmlList = function(key, src) {
  var sources = ['views/partials/header.html'],
      idLinks = [],
      returnEvents;

  // If value is an object
  // Handle the list as a sub_nav list
  if (!Array.isArray(src)) {
    // Retrieve the ids and Headers
    // for each item we are concatenating
    src.sources.forEach(function(view) {
      idLinks.push({
        css_id: view.css_id,
        nav_header: view.nav_header
      });

      sources.push(view.source);
    });

    returnEvents = es.concat(
      gulp.src(sources),
      gulp.src('views/partials/sub_nav.tpl.html')
        .pipe(mustache({
          header: src.header,
          link: idLinks
        })),
      gulp.src('views/partials/footer.html')
    );

  } else {
    // Otherwise, handle the array
    // as a list of strings
    src = sources.concat(src);
    src.push('views/partials/footer.html');
    returnEvents = gulp.src(src);
  }

  return returnEvents;
};

gulp.task('docsJs', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'vendor/chosen_v1.1.0/chosen.jquery.min.js',
    'bower_components/angular-chosen/angular-chosen.js',
    'js/global.js'
  ])
  .pipe(concat('pattern-library.js'))
  .pipe(gulp.dest('docs/js/'))
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('docs/js/'));

  gulp.src([
    'app/app.js',
    'app/scripts/**/{,*/}*.js',
    'js/**/{,*/}*.js'
  ])
  .pipe(concat('pattern-library-docs.js'))
  .pipe(gulp.dest('docs/js'))
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify({ mangle: false }))
  .pipe(gulp.dest('docs/js/'));
});

gulp.task('reloadDocsJs', function() {
  gulp.src('docs/js/*.js')
    .pipe(connect.reload());
});

gulp.task('docsHtml', function() {
  Object.keys(views).forEach(function(key) {
    var concatHtmlTask = htmlList(key, views[key]);
    concatHtmlTask
      .pipe(concat(key + '.html'))
      .pipe(gulp.dest('docs/'));
  });
});

gulp.task('reloadDocsHtml', function() {
  gulp.src('docs/**/*.html')
    .pipe(connect.reload());
});

gulp.task('docsLess', function() {
  return gulp.src([
    'less/pattern-library.less',
    'less/pattern-library-docs.less'
    ])
    .pipe(less({ compress: false }))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('reloadDocsLess', function() {
  gulp.src('docs/css/**/*.css')
    .pipe(connect.reload());
});

gulp.task('docsCommon', ['docsJs', 'docsHtml', 'docsLess'], function() {
  gulp.src('images/**/*.*')
    .pipe(gulp.dest('docs/images'));

  gulp.src('fonts/**/*.*')
    .pipe(gulp.dest('docs/fonts'));
    
  gulp.src('vendor/chosen_v1.1.0/chosen.css')
    .pipe(gulp.dest('docs/css/'));
});

gulp.task('server', ['docsCommon'], function() {
  
  connect.server({
    hostname: 'localhost',
    port: 9000,
    open: true,
    root: 'docs',
    keepalive: false,
    livereload: true
  });

  gulp.watch(['less/**/*.less'], ['docsLess', 'reloadDocsLess']);

  gulp.watch([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'vendor/chosen_v1.1.0/chosen.jquery.min.js',
    'bower_components/angular-chosen/angular-chosen.js',
    'js/global.js',
    'app/app.js',
    'app/scripts/**/{,*/}*.js',
    'js/**/{,*/}*.js'
  ], ['docsJs', 'reloadDocsJs']);

  gulp.watch(['app/**/*.html', 'views/**/*.html'], ['docsHtml', 'reloadDocsHtml']);
});

gulp.task('website', function() {
  docsCommon();
  //'gh-pages';
});





