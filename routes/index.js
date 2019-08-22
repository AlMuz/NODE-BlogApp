const path = require('path');
const appDir = path.dirname(require.main.filename);

const postsController = require(appDir + '/controllers/postsController');
const homeController = require(appDir + '/controllers/homeController');
const aboutController = require(appDir + '/controllers/aboutController');
const contactController = require(appDir + '/controllers/contactController');
const usersController = require(appDir + '/controllers/usersController');

const validateCreatePostMiddleware = require(appDir + '/middleware/validatePost');
const auth = require(appDir + '/middleware/auth');
const redirectIfAuthenticated = require(appDir + '/middleware/redirectIfAuthenticated');

const upload = require(appDir + '/config/uploadFile');

module.exports = function (app) {

  app.get('/', homeController.index)

  app.get('/users/register', redirectIfAuthenticated, usersController.register)

  app.post('/users/register', redirectIfAuthenticated, usersController.create)

  app.get('/users/login', redirectIfAuthenticated, usersController.login)

  app.post('/users/login', redirectIfAuthenticated, usersController.doLogin)

  app.get('/about', aboutController.index)

  app.get('/contact', contactController.index)

  app.get('/post/new', auth, postsController.new)

  app.get('/post/:id', postsController.view)

  app.post('/posts/store', auth, upload.single('image'), validateCreatePostMiddleware, postsController.create)

}
