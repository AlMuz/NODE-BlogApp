const path = require('path');

const appDir = path.dirname(require.main.filename);
const Post = require(appDir + '/database/models/Post');

module.exports = {
  new: function(req, res){
    if (req.session.userId) {
      return res.render('create')
    }
    res.redirect('/')
  },
  view: async function(req, res){
    const post = await Post.findById(req.params.id)
    res.render('post', {
      post
    })
  },
  create: function(req, res){
    Post.create({
      ...req.body,
      image: `/posts/${req.file.filename}`
    }, (error, post) => {
      res.redirect('/')
    })
  }
};
