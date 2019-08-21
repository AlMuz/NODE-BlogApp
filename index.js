const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/posts/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

const Post = require('./database/models/Post');

const app = new express();

mongoose.connect('mongodb://database-service:27017/node-blog-app', {useNewUrlParser: true } )

app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', `${__dirname}/views`);

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

app.post('/posts/store', upload.single('image'), (req, res) => {
  Post.create({
    ...req.body,
    image: `/posts/${req.file.filename}`
  }, (error, post) => {
    res.redirect('/')
  })
})

app.listen(5555, () => {
  console.log('App listening on port 5555');
});
