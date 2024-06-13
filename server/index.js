const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/Users'); 

app.use(express.json());
app.use(cors());

//connecting to Db

mongoose.connect("mongodb+srv://naveensh:Mongo1234@cluster0.wmbxka9.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error: ', err));



app.get("/insert", async (req, res) => {
  try {
    const NewUser = new UserModel({
      name: "Rohit",email: "rrrr@gmail.com", password: "DONTKNOW",  age: 22
    });
    await NewUser.save();
    res.send("Data Inserted");

  } 
  // error handling
  catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});


// Read route
app.get("/read", async (req, res) => {
  try {
    const users = await UserModel.find({});
  
    res.send(users)
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).send("Error reading data");
  }
});



app.listen(3001, () => {
  console.log("SERVER STARTED ");
});
