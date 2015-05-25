// task: cssmin
module.exports = {

    // targets
    'js': {
        options: {
            preserveComments: 'some'
        },
        files: {
            '.grunt-tmp/focuspoint.min.js': [ '.grunt-tmp/focuspoint.js' ]
        }
    }

};
