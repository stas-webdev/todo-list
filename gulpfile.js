var gulp = require('gulp');
var path = require('path');

// ������������
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

// ������ ��-���������
gulp.task('default', ['scripts', 'styles'], function () {
});

// ����������
gulp.task('watch', ['default'], function () {
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.styles.src, ['styles']);
});

// ������ ��� �����������
gulp.task('dist', ['default'], function () {
    config.dist.resources.forEach(function (res) {
        gulp.src(res.src)
            .pipe(gulp.dest(config.dist.dest + res.dest));
    });
});

// JS
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
gulp.task('scripts', function () {
    var bundleMap = path.join(config.scripts.build, config.scripts.bundleMap);
    return browserify({ debug: true })
        .add(config.scripts.main)
        .bundle()
        .pipe(exorcist(bundleMap))
        .pipe(source(config.scripts.bundle))
        .pipe(gulp.dest(config.scripts.build))
});

// LESS
var less = require('gulp-less');
gulp.task('styles', function () {
    gulp.src(config.styles.src)
        .pipe(less())
        .pipe(gulp.dest(config.styles.build));
});