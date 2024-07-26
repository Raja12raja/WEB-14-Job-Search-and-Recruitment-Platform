const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:String,
    userEmail:String,
    Github:String,
    LinkedIn:String,
    About:String,
    Experience:String,
    Skills:[String],


});

// this adds data to colletion users
const UserModel = mongoose.model('users' , UserSchema);
module.exports = UserModel
