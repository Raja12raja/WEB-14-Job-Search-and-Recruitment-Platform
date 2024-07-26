const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:String,
    userEmail:String,
    


});

// this adds data to colletion users
const UserModel = mongoose.model('users' , UserSchema);
module.exports = UserModel
