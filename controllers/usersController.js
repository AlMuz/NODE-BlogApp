const path = require('path');

const appDir = path.dirname(require.main.filename);
const User = require(appDir + '/database/models/User');

module.exports = {
  register: function(req, res){
    res.render('register')
  },
  create: function(req, res){
    Post.create(req.body, (error, post) => {
      res.redirect('/')
    })
  }
};
