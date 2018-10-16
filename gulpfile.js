'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const htmlmin = require('gulp-htmlmin');



gulp.task('minhtml', () => {
    return gulp.src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});




gulp.task('terser', () => {
    return gulp.src('src/**/*.js')
        .pipe(plumber({errorHandler: function(err) {
                console.log(err.toString());
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString(),
                })(err);
            }}))
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));

});


gulp.task('img',function(){
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin({
                interlaced:true,
                progressive:true,
                svgoPlugins:[{removeViewBox:false}]
            })
        )
        .pipe(gulp.dest('./dist/img'))
});


gulp.task('clean', function () {
    return gulp.src('./dist', {read: false}).pipe(clean());
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(plumber({errorHandler: function(err) {
                console.log(err.toString());
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString(),
                })(err);
            }}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('./src/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.js', ['terser']).on('change', browserSync.reload);
    gulp.watch('./src/index.html', ['minhtml']).on('change', browserSync.reload);
});



gulp.task('build', function () {
    runSequence( 'clean',
        ['terser', 'sass', 'img'], 'minhtml');
});

gulp.task('dev', function () {
    runSequence('clean', ['terser', 'sass', 'img'], 'minhtml', 'serve');
    console.log('All done');
});

gulp.task('default', ['dev']);
