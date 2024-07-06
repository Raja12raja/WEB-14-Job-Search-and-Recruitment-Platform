const mongoose = require('mongoose');

const AppliedSchema = new mongoose.Schema({
    
    UserEmail:String,
    UserName:String,
    ContactEmail:String,
    AdminEmail:String,
    JobId:String,
    UserGithub:String,
    UserCv:String,
    UserResume:String,
    Status:String,


});

// this adds data to DB users as applied jobs
const AppliedModel = mongoose.model('applied jobs' , AppliedSchema);
module.exports = AppliedModel
