const jwt = require('jsonwebtoken');
const secret = 'dhu48a82374537ugs';
const expiresIn = 604800;

function generateUserToken(user) {
  // create the desired payload for token
  const payload = { id: user.id, username: user.username };
  // create and return the token (jwt.sign)
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
}

function requireAuth(req, res, next) {
  // destructure token from the the request object
  // express-bearer-token middleware will put it there by parsing the token out of the incoming request
  const { token } = req;
  // if no token, create an unauthorized error and forward to error handlers
  if (!token) {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
  // attempt to verify the token (jwt.verify)
}

module.exports = { requireAuth, generateUserToken };
