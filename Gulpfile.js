var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
/*less conversion*/
var sourcemaps = require('gulp-sourcemaps');
gulp.task('less', function () {
  return gulp.src('./library/less/**/index.less')
	.pipe(sourcemaps.init())
    .pipe(less())
	.pipe( sourcemaps.write() )
    .pipe(gulp.dest('./library/css/'));
});


/*sass conversion*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
gulp.task('scss', function () {
    gulp.src('./library/scss/**/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass())
		.pipe( sourcemaps.write() )
        .pipe(gulp.dest('./library/css/'));
});


/*svg to data uri conversion*/
var uri = require('gulp-data-uri-stream');
var concat = require('gulp-concat');
gulp.task('data-urify', function() {
    return gulp.src('library/images/svg/*.svg')
        .pipe(uri({ 
			output: 'template',
			templateUrl: 'gulp/templates/less-variables.template'
		}))
        .pipe(concat("icon-variables.less"))
        .pipe(gulp.dest("./library/less/config"));
});

gulp.task('icon-less', function() {
    return gulp.src('library/images/svg/*.svg')
        .pipe(uri({ 
			output: 'template',
			templateUrl: 'gulp/templates/less-template.template'
		}))
        .pipe(concat("icons.less"))
        .pipe(gulp.dest("./library/less/global/icons"));
});

gulp.task('icon-demo-page', function() {
    return gulp.src('library/images/svg/*.svg')
        .pipe(uri({ 
			output: 'template',
			templateUrl: 'gulp/templates/html-template.template'
		}))
        .pipe(concat("docs/gulp-build/icons.html"))
        .pipe(gulp.dest("./"));
});

gulp.task('svg-data-uri',['icon-demo-page','icon-less','data-urify']);




/*jshint comes here*/
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var gulp   = require('gulp');
gulp.task('jshint', function() {
  return gulp.src('./library/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/*uglify css files*/
var cssmin = require('gulp-cssmin');
gulp.task('build-css', ['scss'], function() {
  return gulp.src('./library/css/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./build/css'));
});

/*uglify js files*/
var uglify = require( 'gulp-uglify' );
var sourcemaps = require('gulp-sourcemaps');
gulp.task('build-js',[ 'jshint' ], function() {
  return gulp.src('./library/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

