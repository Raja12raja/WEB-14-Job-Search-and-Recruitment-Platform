const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/Users'); 
const JobModel = require('./models/Jobs');

app.use(express.json());
app.use(cors());

//connecting to Db
mongoose.connect("mongodb+srv://naveensh:Mongo1234@cluster0.wmbxka9.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error: ', err));

app.post("/postJob", async (req, res) => {
  try {
    const {
      CompanyName,
      Role,
      Skills,
      mSalary,
      MSalary,
      Location,
      Description,
      Deadline,
      Employmenttype,
      email
    } = req.body.blog;

    const newJob = new JobModel({
      CompanyName,
      Role,
      Skills,
      mSalary,
      MSalary,
      Location,
      Description,
      Deadline,
      Employmenttype,
      email
    });

    await newJob.save();
    res.send("Data Inserted");
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send("Error inserting data");
  }
});

app.listen(5000, () => {
  console.log("SERVER STARTED ");
});
