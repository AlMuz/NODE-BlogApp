const mongoose = require('mongoose');
const { parsed } = require('dotenv').config();

const hostName = parsed.MONGO_HOST_NAME;
const port = parsed.MONGO_PORT;
const dbName = parsed.MONGO_DB_NAME;

mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {useNewUrlParser: true } )

module.exports = mongoose;
