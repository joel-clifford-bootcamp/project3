const chalk = require('chalk');

module.exports = {
    title: function(text){
        return chalk.blue.bold(text);
    },
    number: function(text){
        return chalk.yellow.bold(text);
    }
}