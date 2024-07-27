const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/Users'); 
const JobModel = require('./models/Jobs');
const AppliedModel = require('./models/Applied');
const ProfileModel = require('./models/ProfileData');

app.use(express.json());
app.use(cors());

require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

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
mongoose.connect(mongoURI, {
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

// Route to update user info
app.put("/ProfileInfo", async (req, res) => {
  try {
    const { UEmail, Github, LinkedIn, About, Experience, Skills } = req.body;

    const user = await UserModel.findOne({ UEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (Github) user.Github = Github;
    if (LinkedIn) user.LinkedIn = LinkedIn;
    if (About) user.About = About;
    if (Experience) user.Experience = Experience;
    if (Skills) user.Skills = Skills;

    await user.save();
    res.send("info updated");
  } catch (err) {
    console.error('Error updating info:', err);
    res.status(500).send("Error updating info");
  }
});



//getting users
app.get('/GetUsers', async (req, res) => {
  const data = await UserModel.find({});
  res.json({ success: true, msg: "server is getting", data2: data });
});



//getting data all jobs
app.get('/GetJobs', async (req, res) => {
  const data = await JobModel.find({});
  res.json({ success: true, msg: "server is getting", data1: data });
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


// Route to post profile information
app.post('/ProfileInfo', async (req, res) => {
  try {
    const { UEmail, Github, LinkedIn, About, Experience, Skills } = req.body;

   

    // Check if the profile with the same email already exists
    let profile = await ProfileModel.findOne({ UEmail });

    if (profile) {
     
      profile.Github = Github || profile.Github;
      profile.LinkedIn = LinkedIn || profile.LinkedIn;
      profile.About = About || profile.About;
      profile.Experience = Experience || profile.Experience;
      profile.Skills = Skills || profile.Skills;

      await profile.save();
     
      return res.status(200).json({ message: 'Profile updated successfully', profile });
    } else {
     
    
      profile = new ProfileModel({ UEmail, Github, LinkedIn, About, Experience, Skills });

      try {
        await profile.save();
       
        return res.status(201).json({ message: 'Profile created successfully', profile });
      } catch (saveError) {
        console.error('Error saving new profile:', saveError);
        return res.status(500).json({ message: 'Error saving new profile', error: saveError });
      }
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get profile information
app.get('/Getprofile/:UEmail', async (req, res) => {
  try {
    const { UEmail } = req.params;
   
    const profile = await ProfileModel.findOne({ UEmail });

    if (!profile) {
      console.log('Profile not found');
      return res.status(404).send({ message: 'Profile not found' });
    }
  
    res.send(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send("Error");
  }
});

app.listen(port, () => {
  console.log("SERVER STARTED ");
});
