const mongoose = require('mongoose');

const AppliedSchema = new mongoose.Schema({
    
    UserEmail:String,
    UserName:String,
    ContactEmail:String,
    AdminEmail:String,
    JobId:String,
    UserGithub:String,
    UserResume:String,
    Status:String,
    Title:String,
    CompanyName:String,
    Deadline:Date,


});

// this adds data to DB users as applied jobs
const AppliedModel = mongoose.model('applied jobs' , AppliedSchema);
module.exports = AppliedModel
