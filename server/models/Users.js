const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String, 
    required:true,
  },
  email: {
    type: String, 
    required:true,
  },
  password: {
    type: String, 
    required:true,
  },
  age : {
    type: Number,
  },
});

// this adds data to colletion users
const UserModel = mongoose.model('users' , UserSchema);
module.exports = UserModel
