const bcrypt = require('bcrypt');
const path = require('path');

const appDir = path.dirname(require.main.filename);
const User = require(appDir + '/database/models/User');

module.exports = {
  register: function(req, res){
    res.render('register', {
      errors: req.flash('regErrors')
    })
  },
  create: function(req, res){
    User.create(req.body, (error, post) => {

      if (error) {
        const regErrors = Object.keys(error.errors).map(key => error.errors[key].message);

        req.flash('regErrors', regErrors);

        return res.redirect('/users/register')
      }
      res.redirect('/')
    })
  },
  login: function(req, res){
    res.render('login')
  },
  doLogin: function(req, res) {

    const { email, password } = req.body;

    User.findOne({ email }, (error, user) => {
      if (user) {

        bcrypt.compare(password, user.password, (error, result) => {
          if (result) {

            req.session.userId = user._id;
            return res.redirect('/')
          }else {
            return res.redirect('/users/login')
          }
        })
      }else {
        return res.redirect('/users/login')
      }
    })
  }
};
