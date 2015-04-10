var prompt = require('prompt');
var path = require('path');
var fs = require('fs');
var Message = require('./message');
var Api = require('./api');
var message = new Message();
var api = new Api();

var Auth = function() {

};

Auth.prototype.getDirectory = function() {
  if (process.platform == "win32") {
    process.env.HOME = process.env.USERPROFILE;
  }
  return process.env.HOME + path.sep + 'Documents' + path.sep;
};


Auth.prototype.getFilePath = function() {
  var directory = this.getDirectory();
  var fileName = 'gnpm.txt';
  var filePath = path.join(directory, fileName);
  return filePath;
};

Auth.prototype.save = function(data) {
  fs.writeFileSync(this.getFilePath(), data, 'utf8');
};

Auth.prototype.signIn = function() {
  var self = this;

  prompt.start();

  var schema = {
    properties: {
      email: {
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

  prompt.get(schema, function (err, input) {
    var signInParams = {
      email: input.email,
      password: input.password
    };

    var signIn = api.post('Users/login', signInParams);

    if (signIn.error) {
      message.error(signIn.error.message);
    }
    else {
      var user = api.get('Users/' + signIn.userId, null,  signIn.id);

      if (user.error) {
        message.error(user.error.message);
      }
      else {
        self.save(signIn.id + '|' + user.id);
        message.success('Welcome ' + user.username);
      }
    }
  });
};

Auth.prototype.signUp = function() {
  var self = this;

  prompt.start();

  var schema = {
    properties: {
      username: {
        required: true
      },
      email: {
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

  prompt.get(schema, function (err, input) {
    var signUpParams = {
      username: input.username,
      email: input.email,
      password: input.password
    };

    var signUp = api.post('Users', signUpParams);

    if (signUp.error) {
      message.error(signUp.error.message);
    }
    else {
      var signInParams = {
        email: input.email,
        password: input.password
      };
      var signIn = api.post('Users/login', signInParams);

      if (signIn.error) {
        message.error(signIn.error.message);
      }
      else {
        self.save(signIn.id + '|' + signUp.id);
        message.success('✓ User created!');
        message.success('Welcome ' + input.username);
      }
    }
  });

};

module.exports = Auth;
