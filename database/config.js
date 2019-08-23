const mongoose = require('mongoose');
const { parsed } = require('dotenv').config();

const hostName = parsed.MONGO_HOST_NAME;
const port = 27017;
const dbName = parsed.MONGO_DB_NAME;

mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {useNewUrlParser: true } )

module.exports = mongoose;
