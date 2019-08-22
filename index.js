const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const routes = require("./routes/index");

const mongoose = require('./database/config');

const app = new express();

app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', `${__dirname}/views`);

routes(app)
app.listen(5555, () => {
  console.log('App listening on port 5555');
});
