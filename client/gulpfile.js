var uglify = require("gulp-uglify");
var jshint = require('gulp-jshint');
var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var gulpUtil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['webserver']);

gulp.task('jshint', function() {
    return gulp.src([
	'app/**/*.js',
	'!node_modules/**/*'
    ])
    .pipe(jshint())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function() {
  return gulp.src(['app/**/*.js', '!node_modules/**/*'])
    .pipe(concat('main.js'))
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
    connect.server({
        root: ['app', './'],
        port: 8008,
        fallback: 'app/index.html'
    });
});

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./dist/js/'));
})