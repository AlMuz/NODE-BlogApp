const path = require('path');

const appDir = path.dirname(require.main.filename);
const User = require(appDir + '/database/models/User');

module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) {
      return res.redirect('/')
    }

    next();
  })
};
