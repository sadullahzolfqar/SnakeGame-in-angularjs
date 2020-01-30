
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();



gulp.task('libraries-js', function () {
	return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
    ]) // path to your files
    .pipe(concat('libraries.min.js'))  // concat and name it "concat.js"
    .pipe(uglify())
	.pipe(gulp.dest('dist/libraries'));
});

gulp.task('main-js', function () {
	return gulp.src([
        'src/js/**/*.js',
    ]) // path to your files
    .pipe(concat('main.min.js'))  // concat and name it "concat.js"
    .pipe(gulp.dest('dist/libraries'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('css', function() {
    return gulp.src('./src/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('html', function() {
    return gulp.src('./src/views/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', ['libraries-js', 'main-js', 'html','css']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});


gulp.task('start',['build', 'browser-sync'],async function(done) {
    devMode = true;
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch(['./src/js/**/*.js'], ['main-js']);
    gulp.watch(['./src/views/**/*.html'], ['html']);
});


