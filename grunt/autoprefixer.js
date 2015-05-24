// task: autoprefixer
module.exports = {

    // targets
    'css': {
        src: '.grunt-tmp/focuspoint.css',
        dest: '.grunt-tmp/focuspoint.css',
        options: {
            browsers: ['> 0.1%', 'chrome 4', 'firefox 3.5', 'safari 3.1', 'opera 11.5']
        }
    }

};
