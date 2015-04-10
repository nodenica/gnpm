var colors = require('colors');
var util = require('util');

var Message = function() {

};

Message.prototype.error = function(message) {
  console.log(colors.red(message));
};

Message.prototype.success = function(message) {
  console.log(colors.green(message));
};

Message.prototype.info  = function(message) {
  console.log(colors.yellow(message));
};

module.exports = Message;
