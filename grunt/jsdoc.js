// task: jscdoc
module.exports = {

    // targets
    'focuspoint-api': {
        src: [
            "src/focuspoint.js",
            "readme.md"
        ],
        dest: 'doc',
        options: {
            template: 'node_modules/jaguarjs-jsdoc',
            configure: 'jsdoc-conf.json'
        }
    }

};
