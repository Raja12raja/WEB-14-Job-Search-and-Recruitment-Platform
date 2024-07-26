const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  Github: { type: String },
  LinkedIn: { type: String },
  About: { type: String },
  Experience: { type: String },
  Skills: { type: String }
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileModel;
