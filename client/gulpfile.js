
var uglify = require("gulp-uglify");
var jshint = require('gulp-jshint');
var gulp = require('gulp');

gulp.task('default', function() {
    //code for tasks
});

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});
