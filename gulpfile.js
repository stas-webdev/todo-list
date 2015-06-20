var gulp = require('gulp');
var path = require('path');

// Конфигурация
var config = {
    dist: {
        dest: './dist/',
        resources: [
            { src: ['./build/**/*.*', '!./build/**/*.map'], dest: 'build'},
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
        mainFile: './less/main.less',
        build: './build/css/'
    }
};

gulp.task('default', ['build'], function () {

});

// Сборка
gulp.task('build', ['scripts', 'styles'], function () {
});

// Автосборка
gulp.task('watch', ['build'], function () {
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.styles.src, ['styles']);
});

// Сборка для дистрибуции
gulp.task('dist', ['dist:clean', 'build'], function () {
    config.dist.resources.forEach(function (res) {
        gulp.src(res.src)
            .pipe(gulp.dest(config.dist.dest + res.dest));
    });
});

//Очистка
var del = require('del');
gulp.task('dist:clean', function (cb) {
    return del(config.dist.dest, cb);
});

// JS
gulp.task('scripts', require('./gulp/tasks/scripts')(config.scripts));

// LESS
gulp.task('styles', require('./gulp/tasks/styles')(config.styles));