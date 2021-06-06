const jwt = require('jsonwebtoken');
// read APP_SECRET  from env variables
const APP_SECRET = process.env.APP_SECRET;

function getTokenPayload(token) {
  try {
    return jwt.verify(token, APP_SECRET);
  } catch(err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('Token has expired!');
    }
    throw err
  }
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated');
}

function escapeString(string) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  // https://github.com/benjamingr/RegExp.escape/issues/37
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};



module.exports = {
  APP_SECRET,
  getUserId,
  escapeString,
};