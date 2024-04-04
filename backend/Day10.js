const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Update this connection string with your MongoDB connection details
const MONGODB_URI = 'mongodb://localhost:27017/mern-auth'; // For local MongoDB

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
 console.log('Connected to MongoDB');
});

// Define User Schema and Model
const ProfileSchema = new mongoose.Schema({
 username: { type: String, required: true },
 email: { type: String, required: true },
 password: { type: String, required: true },
});

// Correctly create the model using the ProfileSchema
const Profile = mongoose.model("Profile", ProfileSchema);

app.get('/get/profile',async (req,res) => {
try{
const user = await Profile.find()
res.json(user);}
catch(error){
   console.error(error);
    res.status(500).json({ message: 'Server error' });
}
})

app.get('/get/profile/one',async (req,res) => {
try{const {username} =  req.query;
const user = await Profile.findOne({username:username})
res.json(user);}
catch(error){
   console.error(error);
    res.status(500).json({ message: 'Server error' });
}
})

app.put('/put/profile', async (req,res) => {
try{
const {username,updateProfile} = req.body;
const result  = await Profile.findOneAndUpdate(
{username:username},
{$set:updateProfile},
{new:true, upsert:true}
)
res.json(result);
}
catch(error){
console.error(error);
res.status(500).json({ message: 'Server error' });
}
})

app.post('/post/profile', async (req, res) => {
   try {
      const { username, email, password } = req.body;
  
      const newProfile = new Profile({
        username,
        email,
        password,
      });
  
      const savedProfile = await newProfile.save();
      res.status(201).json(savedProfile);
   } catch (error) {
      console.error(error);
      // Respond with the actual error message and status code 500
      // Note: Be cautious with this approach in production environments
      res.status(500).json({ message: error.message });
   }
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
