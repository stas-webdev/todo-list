var gulp = require('gulp');
var less = require('gulp-less');

var PluginCleanCss = require('less-plugin-clean-css');
var PluginAutoprefix = require('less-plugin-autoprefix');
var cleanCSS = new PluginCleanCss({ advanced: true });
var autoprefix = new PluginAutoprefix({ browsers: ["last 10 versions"] });

module.exports = function (config) {
    return function () {
        gulp.src(config.mainFile)
            .pipe(less({
                plugins: [autoprefix, cleanCSS]
            }))
            .pipe(gulp.dest(config.build));
    }
};