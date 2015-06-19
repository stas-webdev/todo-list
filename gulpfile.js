var gulp = require('gulp');
var path = require('path');

// ������������
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

// ������ ��-���������
gulp.task('default', ['scripts', 'styles'], function () {
});

// ����������
gulp.task('watch', ['default'], function () {
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.styles.src, ['styles']);
});

// ������ ��� �����������
gulp.task('dist', ['clean', 'default'], function () {
    config.dist.resources.forEach(function (res) {
        gulp.src(res.src)
            .pipe(gulp.dest(config.dist.dest + res.dest));
    });
});

//�������
var del = require('del');
gulp.task('clean', function (cb) {
    return del(['./build', config.dist.dest], cb);
});

// JS
gulp.task('scripts', require('./gulp/tasks/scripts')(config.scripts));

// LESS
gulp.task('styles', require('./gulp/tasks/styles')(config.styles));