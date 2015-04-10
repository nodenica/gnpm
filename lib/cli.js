var Auth = require('./auth');
var auth = new Auth();
var Registry = require('./registry');
var registry = new Registry();
var Cache = require('./cache');
var cache = new Cache();

var Cli = function() {

};

Cli.prototype.new = function() {
  auth.signUp();
};

Cli.prototype.login = function() {
  auth.signIn();
};

Cli.prototype.add = function() {
  cache.check();
  registry.add(arguments[0]);
};

Cli.prototype.install = function() {
  cache.check();
  registry.install();
};

module.exports = Cli;
