var es = require('event-stream'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  jshintstylish = require('jshint-stylish')
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  ghPages = require('gulp-gh-pages'),
  mustache = require('gulp-mustache'),
  views = require('./views/views'),
  ngmin = require('gulp-ngmin'),
  templateCache = require('gulp-angular-templatecache'),
  bower = require('gulp-bower'),
  clean = require('gulp-clean');

require('gulp-grunt')(gulp, {
  prefix: 'grunt-tasks-'
});

var htmlList = function(key, src) {
  var sources = [],
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
      // Populate the navigation template
      gulp.src('views/partials/header.html')
        .pipe(mustache({
          page_title: src.header
        })),
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

gulp.task('boomstrapjsLib', function() {
  return gulp.src([
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
  ])
  .pipe(concat('boomstrap.js'))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'))
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify({ mangle: false, outSourceMap: true }))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('boomstrapjsAngular', function() {
  return es.concat(
    gulp.src(['app/app.js', 'app/scripts/**/*.js']),
    gulp.src(['app/template/**/*.html', '!app/template/pagination/*.html'])
      .pipe(templateCache({
        module: 'boomstrap',
        root: 'template'
      })),
    gulp.src('app/template/pagination/*.html')
      .pipe(templateCache({
        module: 'ui.bootstrap.pagination',
        root: 'template/pagination'
      }))
  )
  .pipe(jshint())
  .pipe(jshint.reporter(jshintstylish))
  .pipe(concat('boomstrap-angular.js'))
  .pipe(ngmin())
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'))
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify({ mangle: false, outSourceMap: true  }))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('boomstrapjs', ['boomstrapjsLib', 'boomstrapjsAngular']);

gulp.task('reloadDocsJs', function() {
  gulp.src('docs/js/*.js')
    .pipe(connect.reload());
});

/*
 * Create html files
 */
gulp.task('docsHtml', function() {
  Object.keys(views).forEach(function(key) {
    var concatHtmlTask = htmlList(key, views[key]);
    concatHtmlTask
      .pipe(concat(key + '.html'))
      .pipe(gulp.dest('docs/'));
  });
});

/*
 * Dynamically reload connect website when html changes
 */
gulp.task('reloadDocsHtml', function() {
  gulp.src('docs/**/*.html')
    .pipe(connect.reload());
});

/*
 * Compile less files
 */
gulp.task('boomstrapLessDocs', function() {
  return gulp.src([
    'less/boomstrap.less',
    'less/boomstrap-docs.less'
  ])
  .pipe(less({ compress: false }))
  .pipe(gulp.dest('docs/css'));

});

gulp.task('boomstrapLessDist', function() {
  return gulp.src([
    'less/boomstrap.less'
  ])
  .pipe(less({ compress: true }))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('boomstrapLess', ['boomstrapLessDocs', 'boomstrapLessDist']);
gulp.task('reloadDocsLess', function() {
  gulp.src('docs/css/**/*.css')
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  return gulp.src(['docs/', 'dist/'], { read: false })
    .pipe(clean());
})

gulp.task('bower', function() {
  return bower();
})

/*
 * Common build task run by all tasks
 */
gulp.task('boomstrapcommon', ['bower', 'boomstrapjs', 'boomstrapLess', 'docsHtml'], function() {
  gulp.src('images/**/*.*')
    .pipe(gulp.dest('docs/images'));

  gulp.src('fonts/**/*.*')
    .pipe(gulp.dest('docs/css/fonts'))
    .pipe(gulp.dest('dist/css/fonts'));

  gulp.src('icons/**/*.*')
    .pipe(gulp.dest('docs/css/icons'))
    .pipe(gulp.dest('dist/css/icons'))
});

// Just run compilation by default
gulp.task('default', ['boomstrapcommon']);

// Run a server with a watch with gulp server
gulp.task('server', ['boomstrapcommon'], function() {
  gulp.run('grunt-tasks-ngdocs');
  connect.server({
    hostname: 'localhost',
    port: 9000,
    open: true,
    root: 'docs',
    keepalive: false,
    livereload: true
  });

  // Watch Less files
  gulp.watch(['less/**/*.less'], ['boomstrapLessDocs', 'reloadDocsLess']);

  // Watch Javascript Files and Templates
  gulp.watch([
    'bower_components/**/*.js',
    'js/**/*.js',
    'app/**/*.js',
    'app/template/**/*.html'
  ], ['boomstrapjs', 'reloadDocsJs']);

  // Watch html files
  gulp.watch(['app/views/*.html', 'views/**/*.html'], ['docsHtml', 'reloadDocsHtml']);
});

// Deploy to our github pages page
gulp.task('website', ['boomstrapcommon'], function() {
  // Run our gulp tasks
  gulp.run('grunt-tasks-ngdocs');
  return gulp.run('grunt-tasks-gh-pages');
});





