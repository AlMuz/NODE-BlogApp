const path = require('path');
const appDir = path.dirname(require.main.filename);
const Post = require(appDir + '/database/models/Post');

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

  app.get('/post/new', (req, res) => {
    res.render('create')
  })

  app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
      post
    })
  })

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
  }, (req, res) => {
    Post.create({
      ...req.body,
      image: `/posts/${req.file.filename}`
    }, (error, post) => {
      res.redirect('/')
    })
  })

}
