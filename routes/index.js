const path = require('path');
const appDir = path.dirname(require.main.filename);

const postsController = require(appDir + '/controllers/postsController');
const homeController = require(appDir + '/controllers/homeController');
const aboutController = require(appDir + '/controllers/aboutController');
const contactController = require(appDir + '/controllers/contactController');
const usersController = require(appDir + '/controllers/usersController');

const validateCreatePostMiddleware = require(appDir + '/middleware/validatePost.js');

const upload = require(appDir + '/config/uploadFile');

module.exports = function (app) {

  app.get('/', homeController.index)

  app.get('/users/register', usersController.register)

  app.post('/users/create', usersController.create)

  app.get('/about', aboutController.index)

  app.get('/contact', contactController.index)

  app.get('/post/new', postsController.new)

  app.get('/post/:id', postsController.view)

  app.post('/posts/store', upload.single('image'), validateCreatePostMiddleware, postsController.create)

}
