const mongoose = require('mongoose');

const hostName = "database-service";
const port = 27017;
const dbName = "node-blog-app";

mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {useNewUrlParser: true } )

module.exports = mongoose;
