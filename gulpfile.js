// Grab gulp
var gulp  = require('gulp');

// Grab gulp plugins
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

// create a default task and just log a message
gulp.task('default', ['minify']);

gulp.task('minify', function () {
  return gulp.src('src/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('uqlapp-account.min.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});
