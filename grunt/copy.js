// task: copy
module.exports = {

    // targets
    'pre-js': {
        src: 'src/focuspoint.js',
        dest: '.grunt-tmp/focuspoint.js'
    },
    'pre-css': {
        src: 'src/focuspoint.css',
        dest: '.grunt-tmp/focuspoint.css'
    },
    'post-build-js': {
        src: '.grunt-tmp/focuspoint.js',
        dest: 'build/focuspoint.js'
    },
    'post-build-css': {
        src: '.grunt-tmp/focuspoint.css',
        dest: 'build/focuspoint.css'
    },
    'post-dist-js': {
        src: '.grunt-tmp/focuspoint.js',
        dest: 'dist/focuspoint.min.js'
    },
    'post-dist-css': {
        src: '.grunt-tmp/focuspoint.css',
        dest: 'dist/focuspoint.min.css'
    }

};