const express = require('express');
const path = require('path');
const edge = require('edge.js');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const routes = require("./routes/index");

const mongoose = require('./database/config');

const app = new express();

const mongoStore = connectMongo(expressSession);
app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(connectFlash());
app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId);
  next();
})

routes(app)
app.listen(5555, () => {
  console.log('App listening on port 5555');
});
