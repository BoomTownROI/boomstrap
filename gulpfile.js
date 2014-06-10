var es          = require('event-stream'),
  gulp          = require('gulp'),
  newer         = require('gulp-newer'),
  concat        = require('gulp-concat'),
  rename        = require('gulp-rename'),
  less          = require('gulp-less'),
  uglify        = require('gulp-uglify'),
  jshint        = require('gulp-jshint'),
  jshintstylish = require('jshint-stylish')
  watch         = require('gulp-watch'),
  connect       = require('gulp-connect'),
  livereload    = require('gulp-livereload'),
  ghPages       = require('gulp-gh-pages'),
  mustache      = require('gulp-mustache'),
  views         = require('./views/views'),
  ngmin         = require('gulp-ngmin'),
  templateCache = require('gulp-angular-templatecache'),
  bower         = require('gulp-bower'),
  clean         = require('gulp-clean'),
  order         = require('gulp-order');
  // dgeni = require('dgeni');

require('gulp-grunt')(gulp, {
  prefix: 'grunt-tasks-'
});

var htmlList = function(key, src) {
  var sources = [],
      idLinks = [];
  
  // Retrieve the ids and Headers
  // for each item we are concatenating
  src.sources.forEach(function(view) {
    idLinks.push({
      css_id: view.css_id,
      nav_header: view.nav_header
    });

    sources.push(view.source);
  });

  var orderedOutput = sources.slice();
  orderedOutput.unshift('views/partials/header.html');
  orderedOutput.push('views/partials/sub_nav.tpl.html');
  orderedOutput.push('views/partials/footer.html');

  // Remove fully qualified path except for file name
  // Because gulp-order only uses the file name and not the path.
  orderedOutput = orderedOutput.map(function(file) {
    var splitFile = file.split('/');
    return splitFile[splitFile.length - 1];
  });

  return es.concat(
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
  ).pipe(order(orderedOutput));
};

gulp.task('boomstrapjsLib', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-mousewheel/jquery.mousewheel.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js',
    'bower_components/bootstrap-select/bootstrap-select.min.js',
    'vendor/chosen/chosen.jquery.min.js',
    'bower_components/baron/baron.min.js',
    'bower_components/momentjs/min/moment.min.js',
    'js/global.js',
    'js/vendor-config.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular/angular-animate.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-ui-select/dist/select.js', // No minified version
    'bower_components/angular-moment/angular-moment.min.js',
    // 'bower_components/perfect-scrollbar/src/perfect-scrollbar.js', // Using angular dependency version
    'bower_components/angular-perfect-scrollbar/dependencies/perfect-scrollbar.js',
    'bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js'
  ])
  .pipe(newer('docs/js/boomstrap.js'))
  .pipe(concat('boomstrap.js'))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'))
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify({ mangle: false, outSourceMap: true }))
  .pipe(gulp.dest('docs/js/'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('boomstrapjsAngular', function() {
  return gulp.src(['app/app.js', 'app/constants.js', 'app/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(jshintstylish))
    .pipe(ngmin())
    .pipe(concat('boomstrap-angular.js'))
    .pipe(gulp.dest('docs/js/'));
});

gulp.task('boomstrapjsTemplates', function() {
  return es.concat(
    gulp.src(['app/template/**/*.html', '!app/template/pagination/*.html'])
      .pipe(templateCache({
        module: 'boomstrap',
        root: 'template'
      })),
    gulp.src('app/template/bootstrap/**/*.html')
      .pipe(templateCache({
        module: 'ui.bootstrap',
        root: 'template/'
      }))
  )
  .pipe(concat('boomstrap-angular-templates.js'))
  .pipe(gulp.dest('docs/js/'));
})

gulp.task('boomstrapjs', ['boomstrapjsLib', 'boomstrapjsAngular', 'boomstrapjsTemplates'], function() {
  // Combine templates and angular
  return gulp.src(['docs/js/boomstrap-angular.js', 'docs/js/boomstrap-angular-templates.js'])
    .pipe(concat('boomstrap-angular.js'))
    .pipe(gulp.dest('docs/js/'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({ suffix:'.min' }))
    .pipe(uglify({ mangle: false, outSourceMap: true  }))
    .pipe(gulp.dest('docs/js/'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('reloadDocsJs', function() {
  gulp.src('docs/js/*.js')
    .pipe(connect.reload());
});

/*
 * Create html files
 */
gulp.task('docsHtml', function() {
  return es.concat.apply(es,
    Object.keys(views).map(function(key) {
      var concatHtmlTask = htmlList(key, views[key]);
      return concatHtmlTask.pipe(concat(key + '.html'));
    })
  ).pipe(gulp.dest('docs/'));
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
  var DEST_DIR  = 'docs/css';
  var DEST_FILE = 'boomstrap.less';

  return gulp.src([
    'less/boomstrap.less',
    'less/boomstrap-docs.less'
  ])
    .pipe(newer(DEST_DIR + '/' + DEST_FILE))
    .pipe(concat(DEST_FILE))
    .pipe(less({ compress: false }))
    .pipe(gulp.dest(DEST_DIR));

});

gulp.task('boomstrapLessDist', function() {
  var DEST_DIR  = 'dist/css';
  var DEST_FILE = 'boomstrap.less';

  return gulp.src([
    'less/boomstrap.less'
  ])
    .pipe(newer(DEST_DIR + '/' + DEST_FILE))
    .pipe(concat(DEST_FILE))
    .pipe(less({ compress: true }))
    .pipe(gulp.dest(DEST_DIR));
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
gulp.task('boomstrapcommon', ['boomstrapLess', 'boomstrapjs', 'docsHtml'], function() {
  var IMAGES_DIR   = 'docs/images',
    FONTS_DOCS_DIR = 'docs/css/fonts',
    FONTS_DIST_DIR = 'dist/css/fonts',
    ICONS_DOCS_DIR = 'docs/css/icons',
    ICONS_DIST_DIR = 'dist/css/icons';

  // Copy all image/font/icon files if they are newer than destination
  return es.concat(
    gulp.src('images/**/*.*')
      .pipe(newer(IMAGES_DIR))
      .pipe(gulp.dest(IMAGES_DIR)),
    gulp.src('fonts/**/*.*')
      .pipe(newer(FONTS_DOCS_DIR))
      .pipe(gulp.dest(FONTS_DOCS_DIR)),
    gulp.src('fonts/**/*.*')
      .pipe(newer(FONTS_DIST_DIR))
      .pipe(gulp.dest(FONTS_DIST_DIR)),
    gulp.src('icons/**/*.*')
      .pipe(newer(ICONS_DOCS_DIR))
      .pipe(gulp.dest(ICONS_DOCS_DIR)),
    gulp.src('icons/**/*.*')
      .pipe(newer(ICONS_DIST_DIR))
      .pipe(gulp.dest(ICONS_DIST_DIR))
  );
});

// gulp.task('angularAPI', function() {
//   var generateDocs = dgeni.generator('apiDocs/dgeni.conf.js').generateDocs();
//   return generateDocs()
//     .catch(function(error) {
//       process.exit(1);
//     });
// });

// Just run compilation by default
gulp.task('default', ['boomstrapcommon']);

// Run a server with a watch with gulp server
gulp.task('server', ['boomstrapcommon'], function() {
  gulp.run('grunt-tasks-ngdocs');
  // gulp.run('angularAPI');
  connect.server({
    hostname: 'localhost',
    port: 9000,
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
