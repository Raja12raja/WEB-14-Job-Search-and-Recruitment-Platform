// const mongoose =  require('mongoose');

// const JobSchema = new mongoose.Schema({
//     CompanyName: {
//     type: String, 
//     required:true,
//   },
//   email: {
//     type: String, 
//     required:true,
//   },
//   Role: {
//     type: String, 
//     required:true,
//   },
//   Skills: {
//     type: String, 
//     required:true,
//   },
//   Location: {
//     type: String, 
//     required:true,
//   },
//   Description: {
//     type: String, 
//     required:true,
//   },
//   Employmenttyp: {
//     type: String, 
//     required:true,
//   },
//   mSalary : {
//     type: Number,
//   },
//   MSalary : {
//     type: Number,
//   },
//   Deadline : {
//     type: Date,
//   },
// });

// // this adds data to colletion jobs
// const JobModel = mongoose.model('Job', JobSchema);
// module.exports = JobModel;


const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  CompanyName: String,
  Role: String,
  Skills: String,
  mSalary: Number,
  MSalary: Number,
  Location: String,
  Description: String,
  Deadline: Date,
  Employmenttype: String,
  email: String,
});

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;
