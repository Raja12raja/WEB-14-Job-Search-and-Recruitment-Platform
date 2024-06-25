
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
  Logo: String,
});

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;
