const mongoose = require('mongoose');

const mongoDBConnect = () => {
  const connectionParams = { useNewUrlParser: true };
  mongoose.connect(process.env.MONGODB, connectionParams);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDb successfully');
  });

  mongoose.connection.on('error', (error) => {
    console.log('Error while connecting to database:' + error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDb connection disconnected');
  });
};

module.exports = mongoDBConnect;
