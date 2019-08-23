const bcrypt = require('bcrypt');
const path = require('path');

const appDir = path.dirname(require.main.filename);
const User = require(appDir + '/database/models/User');

module.exports = {
  register: function(req, res){
    res.render('register', {
      errors: req.flash('regErrors'),
      data: req.flash('data')[0]
    })
  },
  create: function(req, res){
    User.create(req.body, (error, post) => {

      if (error) {

        if (error.code === 11000) {
          var regErrors = ['This email is already taken!'];
        }else {
          var regErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        }

        req.flash('regErrors', regErrors);
        req.flash('data', req.body);

        return res.redirect('/users/register')
      }
      res.redirect('/')
    })
  },
  login: function(req, res){
    res.render('login', {
      errors: req.flash('logErrors')
    })
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
            logErrors = ['Incorrect password'];
            req.flash('logErrors', logErrors);

            return res.redirect('/users/login')
          }
        })
      }else {
        logErrors = ['User not found'];
        req.flash('logErrors', logErrors);

        return res.redirect('/users/login')
      }
    })
  },
  logout: function(req, res) {
    req.session.destroy(() => {
      res.redirect('/')
    })
  }
};
