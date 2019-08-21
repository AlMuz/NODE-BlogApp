const mongoose = require('mongoose');


const PostSchema = new mongoose.schema({
  title: String,
  description: String,
  content: String
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
