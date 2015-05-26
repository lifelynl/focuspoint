// grunt task specification
module.exports = {

    // ------------------------------------
    //   Development task
    //   build distribution version
    //   initialize watcher
    // ------------------------------------
    'default': [

        // Build
        'build',

        // File watcher
        'watch'

    ],


    // ------------------------------------
    //   Build task
    //   build a distribution version
    // ------------------------------------
    'build': [

        // Clean up temporary folder
        'clean:tmp',

        // Generate doc
        'clean:doc',
        'jsdoc:focuspoint-api',

        // Copy from source
        'copy:src-js',
        'copy:src-css',

        // Autoprefixer processor
        'autoprefixer:css',

        // Minify
        'uglify:js',
        'cssmin:css',

        // Clean up distribution folder
        'clean:dist',

        // Copy to distribution folder
        'copy:dist-js',
        'copy:dist-css',

        // Clean up temporary folder
        'clean:tmp',

    ]


};
