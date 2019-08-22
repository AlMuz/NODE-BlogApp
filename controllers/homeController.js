const path = require('path');

const appDir = path.dirname(require.main.filename);
const Post = require(appDir + '/database/models/Post');

module.exports = {
  index: async function(req, res){
    const posts = await Post.find({})
    res.render('index', {
      posts
    })
  }
};
