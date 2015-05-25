// task: copy
module.exports = {

    // targets
    'src-js': {
        cwd: 'src/',
        src: '**/*.js',
        dest: '.grunt-tmp/',
        expand: true
    },
    'src-css': {
        cwd: 'src/',
        src: '**/*.css',
        dest: '.grunt-tmp/',
        expand: true
    },
    'dist-js': {
        cwd: '.grunt-tmp/',
        src: '**/*.js',
        dest: 'dist/',
        expand: true
    },
    'dist-css': {
        cwd: '.grunt-tmp/',
        src: '**/*.css',
        dest: 'dist/',
        expand: true
    },

};