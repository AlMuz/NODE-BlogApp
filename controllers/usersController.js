const path = require('path');

const appDir = path.dirname(require.main.filename);
const User = require(appDir + '/database/models/User');

module.exports = {
  register: function(req, res){
    res.render('register')
  },
  create: function(req, res){
    User.create(req.body, (error, post) => {

      if (error) {
        return res.redirect('/users/register')
      }
      res.redirect('/')
    })
  }
};
