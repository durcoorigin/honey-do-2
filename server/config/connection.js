const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/honeydolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB connection successful.');
}).catch((e) => {
  console.log('MongoDB connection error: ', e.message)
});

module.exports = mongoose.connection;
