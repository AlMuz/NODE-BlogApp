const path = require('path');
const appDir = path.dirname(require.main.filename);
const Post = require(appDir + '/database/models/Post');
const postsController = require(appDir + '/controllers/postsController');

const upload = require(appDir + '/config/uploadFile');

module.exports = function (app) {

  app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
      posts
    })
  })

  app.get('/about', (req, res) => {
    res.render('about')
  })

  app.get('/contact', (req, res) => {
    res.render('contact')
  })

  app.get('/post/new', postsController.new)

  app.get('/post/:id', postsController.view)

  app.post('/posts/store', upload.single('image'), (req, res, next) => {
    if (
        !req.file ||
        !req.body.title ||
        !req.body.description ||
        !req.body.content ||
        !req.body.username
      ) {
        return res.redirect('/post/new');
    }
    next();
  }, postsController.create)

}
