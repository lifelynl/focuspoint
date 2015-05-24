// task: cssmin
module.exports = {

    // targets
    'css': {
        options: {
            report: 'min'
        },
        files: {
            '.grunt-tmp/focuspoint.css': [ '.grunt-tmp/focuspoint.css' ]
        }
    }

};
