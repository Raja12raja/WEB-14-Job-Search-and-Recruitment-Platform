const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const UserModel = require('./models/Users'); 
const JobModel = require('./models/Jobs');
const AppliedModel = require('./models/Applied');

app.use(express.json());
app.use(cors());

// Ensure the uploads directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Generating unique file name
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

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
      email,
      Logo
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
      email,
      Logo
    });

    await newJob.save();
    res.send("Data Inserted");
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send("Error inserting data");
  }
});

app.post("/loginInfo", async(req,res)=>{
  try{
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;

    const userinfo = new UserModel({
     userName,
     userEmail,
    });

    await userinfo.save();
    res.send("info inserted");
  }
  catch (err) {
    console.error('Error inserting info:', err);
    res.status(500).send("Error inserting info");
  }
});

//getting data all jobs
app.get('/GetJobs', async (req, res) => {
  const data = await JobModel.find({});
  res.json({ success: true, msg: "server is getting", data1: data });
});

//getting users
app.get('/GetUsers', async (req, res) => {
  const data = await UserModel.find({});
  res.json({ success: true, msg: "server is getting", data2: data });
});

//deleting job  
app.delete('/DeleteJob/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await JobModel.findByIdAndDelete(id);
    res.send("Job deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

//getting a particular Job
app.get('/GetJobById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await JobModel.findById(id);

    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }
    res.send(job);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

//Adding applied Job
app.post('/applyJOB',async (req, res) => {
  try {
    const {
      UserName,
      UserEmail,
      ContactEmail,
      AdminEmail,
      JobId,
      UserGithub,
      Status,
      CompanyName,
      Title,
      Deadline,
      UserResume
    } = req.body;


    const Jobinfo = new AppliedModel({
      UserName,
      UserEmail,
      ContactEmail,
      AdminEmail,
      JobId,
      UserGithub,
      Status,
      CompanyName,
      Title,
      Deadline,
      UserResume
    

    });

    await Jobinfo.save();
    res.send("Inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

//getting applied Jobs
app.get('/GetAppliedJobs', async (req, res) => {
  const data = await AppliedModel.find({});
  res.json({ success: true, msg: "server is getting", data3: data });
});


// update a job application
app.put('/editAppliedJob/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedJob = await AppliedModel.findByIdAndUpdate(req.params.id, { Status: status }, { new: true });
    res.json({ success: true, msg: 'Job updated successfully', updatedJob });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating job');
  }
});

// update a job
app.put('/EditJob/:id', async (req, res) => {
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
      email,
      Logo
    } = req.body;

    const updatedJob = await JobModel.findByIdAndUpdate(
      req.params.id,
      {
        CompanyName,
        Role,
        Skills,
        mSalary,
        MSalary,
        Location,
        Description,
        Deadline,
        Employmenttype,
        email,
        Logo
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).send({ message: 'Job not found' });
    }

    res.json({ success: true, msg: 'Job updated successfully', updatedJob });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating job');
  }
});

app.listen(5000, () => {
  console.log("SERVER STARTED ");
});
