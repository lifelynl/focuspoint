// grunt watch task
module.exports = {

    // targets
    css: {
        files: [ 'src/*.css' ],
        tasks: [ 'copy:pre-css', 'autoprefixer:css', 'copy:post-build-css', 'clean:tmp' ]
    },
    js: {
        files: [ 'src/*.js' ],
        tasks: [ 'copy:pre-js', 'copy:post-build-js' ]
    },

    livereload: {
        options: {
            livereload: true
        },
        files: [
            'build/**/*',
            'src/**/*'
        ]
    }

};
