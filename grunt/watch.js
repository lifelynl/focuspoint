// grunt watch task
module.exports = {

    // targets
    css: {
        files: [ 'src/**/*.css' ],
        tasks: [ 'clean:tmp', 'copy:src-css', 'autoprefixer:css', 'cssmin:css', 'clean:dist-css', 'copy:dist-css', 'clean:tmp' ]
    },
    js: {
        files: [ 'src/**/*.js' ],
        tasks: [ 'clean:tmp', 'clean:doc', 'jsdoc:focuspoint-api', 'copy:src-js', 'uglify:js', 'clean:dist-js', 'copy:dist-js', 'clean:tmp' ]
    },

    livereload: {
        options: {
            livereload: true
        },
        files: [
            'dist/**/*'
        ]
    }

};
