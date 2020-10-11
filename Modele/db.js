var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/polyforumdb';
mongoose.connect(mongoDB, {useNewUrlParser: true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var DB = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
DB.on('error', console.error.bind(console, 'M'));


