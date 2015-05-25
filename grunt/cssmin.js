// task: cssmin
module.exports = {

    // targets
    'css': {
        options: {
            preserveComments: 'some'
        },
        files: {
            '.grunt-tmp/focuspoint.min.css': [ '.grunt-tmp/focuspoint.css' ]
        }
    }

};
