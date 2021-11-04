const chalk = require('chalk');

function error(message) {
  return chalk.green.bold(message);
}
module.exports = error;
