const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  name: String,
  designation: String,
  from: Date,
  to: Date,
  url: String,
  email: String,
  emailSent : Boolean
});

const letter = mongoose.model('letter', letterSchema);

module.exports = letter;
