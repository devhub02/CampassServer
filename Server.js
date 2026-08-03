const mongoose = require('mongoose');

const uri = "mongodb+srv://devhub:mNgb_dCrd7tcNaA@devhub.v16j29z.mongodb.net/?appName=devhub";
const uri = "mongodb+srv://anshhub999_db_user:mNgb_dCrd7tcNaA@devhub.v16j29z.mongodb.net/";

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));