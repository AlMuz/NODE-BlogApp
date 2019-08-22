const path = require('path');

const appDir = path.dirname(require.main.filename);
const Post = require(appDir + '/database/models/Post');

module.exports = {
  register: function(req, res){
    res.render('register')
  },
};
