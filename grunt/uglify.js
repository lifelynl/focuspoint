// task: cssmin
module.exports = {

    // targets
    'js': {
        options: {
            report: 'min'
        },
        files: {
            '.grunt-tmp/focuspoint.js': [ '.grunt-tmp/focuspoint.js' ]
        }
    }

};
