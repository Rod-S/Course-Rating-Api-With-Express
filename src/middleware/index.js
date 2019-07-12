const auth = require('basic-auth');

const authCredentials = (req, res, next) => {
  if (req.headers.authorization) {
    var credentials = auth.parse(req.headers.authorization);
    req.email = credentials.name;
    req.pass = credentials.pass;
    return next();
  } else {
    var err = new Error('You must be signed in to view this page.')
    err.status = 401;
    return next(err);
  }
};

module.exports.authCredentials = authCredentials;
