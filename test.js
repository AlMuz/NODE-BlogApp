const mongoose = require('mongoose');
const Post = require('./database/models/Post')
const { parsed } = require('dotenv').config();

const hostName = parsed.MONGO_HOST_NAME;
const port = 27017;
const dbName = parsed.MONGO_DB_NAME;

mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {useNewUrlParser: true } )

// Creating data
// Post.create({
//   title: 'My first blog',
//   description: 'Blog post',
//   content: 'lipsum lorem emet'
// }, (error, post) => {
//   console.log(error);
//   console.log(post);
// })


// Finding data with empty where statement
// Post.find({}, (error, post) => {
//   console.log(error);
//   console.log(post);
// })

// Finding data using id
// Post.findById("5d5ceb225cebed00ca74893d", (error, post) => {
//   console.log(error);
//   console.log(post);
// })

// Post.findByIdAndUpdate("5d5ceb225cebed00ca74893d", {
//   title: 'My first blog updated post'
// }, (error, post) => {
//   console.log(error);
//   console.log(post);
// })
