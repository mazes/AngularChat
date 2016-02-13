var uglify = require("gulp-uglifyjs");
var jshint = require('gulp-jshint');
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('default', ['webserver']);

gulp.task('jshint', function() {
    return gulp.src([
	'**/*.js',
	'!node_modules/**/*'
    ])
    .pipe(jshint())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
});

gulp.task('uglify', function() {
  return gulp.src(['src/*.js', 'src/login/LoginController.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('webserver', function() {
  connect.server({
    port: 8008
    });
});

