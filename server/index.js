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

//getting data
app.get('/GetJobs',async(req,res)=>{
  const data= await JobModel.find({});
  res.json({success:true,msg: "server is getting",data1:data});
  
})

//getting users
app.get('/GetUsers' , async (req,res)=>{
  const data = await UserModel.find({});
  res.json({success:true,msg: "server is getting",data2:data})
} )


app.listen(5000, () => {
  console.log("SERVER STARTED ");
});
