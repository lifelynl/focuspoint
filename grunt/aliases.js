// grunt task specification
module.exports = {

    // ------------------------------------
    //   Development task
    //   build development version
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
    //   build development version
    // ------------------------------------
    'build': [

        // Pre
        'clean:build',

        // Pre-copy
        'copy:pre-js',
        'copy:pre-css',

        // Autoprefixer processor
        'autoprefixer:css',

        // Post-copy
        'copy:post-build-js',
        'copy:post-build-css',

        // Post
        'clean:tmp',

    ],


    // ------------------------------------
    //   Distribute task
    //   build distribution version
    // ------------------------------------
    'distribute': [

        // Pre
        'clean:dist',

        // Pre-copy
        'copy:pre-js',
        'copy:pre-css',

        // Autoprefixer processor
        'autoprefixer:css',

        // Uglify
        'uglify:js',
        'cssmin:css',

        // Post-copy
        'copy:post-dist-js',
        'copy:post-dist-css',

        // Post
        'clean:tmp',

    ]


};
