var gulp = require('gulp');
var less = require('gulp-less');

module.exports = function (config) {
    return function () {
        gulp.src(config.mainFile)
            .pipe(less())
            .pipe(gulp.dest(config.build));
    }
};