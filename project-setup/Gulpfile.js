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
    return gulp.src('library/images/**/*.svg')
        .pipe(uri({ output: 'json' }))
        .pipe(concat("URIs.json"))
        .pipe(gulp.dest("./"));
});

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

/* 
*image compression
*/
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
gulp.task('imagemin', function () {
    return gulp.src('./library/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/images'));
});
