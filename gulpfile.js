var gulp = require('gulp');
var path = require('path');

// Конфигурация
var config = {
    dist: {
        dest: './dist/',
        resources: [
            { src: './build/**/*.*', dest: 'build'},
            { src: './vendor/**/*.*', dest: 'vendor' },
            { src: './index.html', dest: '' }
        ]
    },

    scripts: {
        src: './js/**/*.js',
        main: './js/main.js',
        build: './build/js',
        bundle: 'app.js',
        bundleMap: 'app.map'
    },

    styles: {
        src: './less/**/*.less',
        build: './build/css/'
    }
};

// Задача по-умолчанию
gulp.task('default', ['scripts', 'styles'], function () {
});

// Автосборка
gulp.task('watch', ['default'], function () {
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.styles.src, ['styles']);
});

// Сборка для дистрибуции
gulp.task('dist', ['default'], function () {
    config.dist.resources.forEach(function (res) {
        gulp.src(res.src)
            .pipe(gulp.dest(config.dist.dest + res.dest));
    });
});

// JS
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
gulp.task('scripts', function () {
    return browserify({
        entries: config.scripts.main,
        debug: true
    }).bundle()
        .pipe(source(config.scripts.bundle))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.scripts.build));
});

// LESS
var less = require('gulp-less');
gulp.task('styles', function () {
    gulp.src(config.styles.src)
        .pipe(less())
        .pipe(gulp.dest(config.styles.build));
});