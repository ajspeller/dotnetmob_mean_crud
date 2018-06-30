const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGODB_USERID}:${process.env.MONGODB_PASSWORD}@ds121321.mlab.com:21321/ajs_dotnet_mob_cruddb`, (err) => {
  if (!err) {
    console.log('MongoDB connection successful!');
  } else {
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
  }
});

module.exports = mongoose;