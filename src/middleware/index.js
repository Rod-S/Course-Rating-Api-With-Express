const auth = require('basic-auth');

function authCredentials(req, res, next){
  if (req.headers.authorization) {
    var credentials = auth.parse(req.headers.authorization);
    res.locals = credentials;
    return next();
  } else {
    var err = new Error('You must be signed in to view this page.')
    err.status = 401;
    return next(err);
  }
};

module.exports.authCredentials = authCredentials;
