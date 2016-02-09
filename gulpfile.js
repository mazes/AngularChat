
var lint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('default', function() {
    //code for tasks
});

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});
