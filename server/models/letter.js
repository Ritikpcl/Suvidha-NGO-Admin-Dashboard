const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  ref_no : Number,
  name: String,
  designation: String,
  from: Date,
  to: Date,
  url: String,
  email: String,
  emailSent : Boolean,
  paid : Boolean,
});

const letter = mongoose.model('letter', letterSchema);

module.exports = letter;
