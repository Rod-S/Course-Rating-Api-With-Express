const auth = require('basic-auth');
const User = require('../models/models').User;

function authCredentials(req, res, next){
  if (req.headers.authorization) {
    var credentials = auth.parse(req.headers.authorization);
    User.authenticate(credentials.name, credentials.pass, function(user, error) {
      if (error || !user) {
        var err = new Error ('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        console.log('user authenticated.');
        req.user = user;
        return next();
      }
    });
  } else {
    var err = new Error('You must be signed in to view this page.')
    err.status = 401;
    return next(err);
  }
};

module.exports.authCredentials = authCredentials;
