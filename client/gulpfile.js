
var uglify = require("gulp-uglifyjs");
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

gulp.task('uglify', function() {
  return gulp.src(['src/*.js', 'src/login/LoginController.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});
