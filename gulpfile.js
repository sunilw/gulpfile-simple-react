var gulp = require('gulp') ;
var sass = require('gulp-sass') ;
var babel = require('gulp-babel') ;
var watch = require('gulp-watch') ;
var terser = require ('gulp-terser');
var sourcemaps = require('gulp-sourcemaps') ;
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var combiner = require('stream-combiner2');

gulp.task('watch', function () {
    gulp.watch('./src/sass/**.scss', gulp.series('sass')) ;

});

gulp.task( 'sass', function() {

    return gulp.src('./src/sass/**.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream()) ;

}) ;

gulp.task('scripts', function() {
    return gulp.src(['./src/js/main.js' ])
        .pipe(babel({
            presets : ['@babel/preset-react']
        }))
        .pipe(concat('test.js'))
        .pipe(gulp.dest('./js'))
        .pipe(terser())
        .pipe(rename('test.min.js'))
        .pipe(gulp.dest('./js')) ;
});

gulp.task('serve', function() {
    browserSync({
        proxy : 'http://test2',
        open:   false
    });
    gulp.watch("./js/**").on('change', browserSync.reload);
});

// old way
// gulp.task('default', ['sass', 'scripts','watch', 'serve']) ;

// new way
gulp.task( 'default',  gulp.parallel('sass', 'scripts','watch', 'serve'));
