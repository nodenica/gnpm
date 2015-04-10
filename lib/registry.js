var prompt = require('prompt');
var path = require('path');
var fs = require('fs');
var Message = require('./message');
var Api = require('./api');
var message = new Message();
var api = new Api();
var Cache = require('./cache');
var cache = new Cache();
var npm = require("npm");

var Registry = function() {

};

Registry.prototype.add = function(moduleName) {
  if (moduleName) {
    var packageParams = {
      name: moduleName,
      user_id: cache.get('userId')
    };

    var package = api.post('Packages', packageParams, cache.get('accessToken'));

    if (package.error) {
      message.error(package.error.message);
    }
    else {
      message.success('Module ' + package.name + ' was added!');
    }
  }
  else {
    message.error('Module name is required');
    message.info('Example: gnpm add strongloop');
  }
};

Registry.prototype.install = function(moduleName) {

  var packages = api.get('Packages', null, cache.get('accessToken'));

  if (packages.error) {
    message.error(packages.error.message);
  }
  else {

    var packageList = [];

    packages.forEach(function(package) {
      packageList.push(package.name);
    });

    npm.load(function (err) {
      npm.config.set('global', true);
      // catch errors
      npm.commands.install(packageList, function (er, data) {
        // log the error or data
      });
      npm.on("log", function (message) {
        // log the progress of the installation
        console.log(message);
      });
    });
  }

};

module.exports = Registry;
