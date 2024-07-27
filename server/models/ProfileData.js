const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  UEmail: { type: String, required: true, unique: true },
  Github: { type: String },
  LinkedIn: { type: String },
  About: { type: String },
  Experience: { type: String },
  Skills: { type: String }
});

const ProfileModel = mongoose.model('Profileee', ProfileSchema);

module.exports = ProfileModel;
