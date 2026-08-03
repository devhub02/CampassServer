const mongoose = require('mongoose');

const uri = "mongodb+srv://devhub:mNgb_dCrd7tcNaA@devhub.v16j29z.mongodb.net/?appName=devhub";

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));