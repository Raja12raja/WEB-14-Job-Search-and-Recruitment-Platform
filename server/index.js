const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/Users'); 
const JobModel = require('./models/Jobs');
const AppliedModel = require('./models/Applied')

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
    res.send("info inserted")
  }
  catch (err) {
    console.error('Error inserting info:', err);
    res.status(500).send("Error inserting info");
  }
});

//getting data all jobs
app.get('/GetJobs',async(req,res)=>{
  const data= await JobModel.find({});
  res.json({success:true,msg: "server is getting",data1:data});
  
})

//getting users
app.get('/GetUsers' , async (req,res)=>{
  const data = await UserModel.find({});
  res.json({success:true,msg: "server is getting",data2:data})
} )

//deleting job  
app.delete('/DeleteJob/:id',async (req,res)=>{

  try {
    const {id} = req.params;
    await JobModel.findByIdAndDelete(id);
    res.send(" Job deleted ");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error")
  }
})




//Adding applied Job
app.post('/applyJOB', async (req, res) => {
  try {
    const {
      UserName,
      UserEmail,
      ContactEmail,
      AdminEmail,
      JobId,
      UserGithub,
      Status
    } = req.body;

    const Jobinfo = new AppliedModel({
      UserName,
      UserEmail,
      ContactEmail,
      AdminEmail,
      JobId,
      UserGithub,
      Status
    });

    await Jobinfo.save();
    res.send("Inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});


//getting a perticular Job
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


app.listen(5000, () => {
  console.log("SERVER STARTED ");
});
