const path = require('path');

const appDir = path.dirname(require.main.filename);
const User = require(appDir + '/database/models/User');

module.exports = (req, res, next) => {
  
  if (req.session.userId) {
    return res.redirect('/')
  }
  next();
};
