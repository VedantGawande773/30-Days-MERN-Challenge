// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
const UserSchema = new mongoose.Schema({
 username: { type: String, required: true,  },
 password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
 if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
 }
 next();
});

const User = mongoose.model('User', UserSchema);

// User Registration Endpoint
app.post('/register', async (req, res) => {
 const { username, password } = req.body;
 try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
 } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ error: 'Error registering user' });
 }
});

// User Login Endpoint
app.post('/login', async (req, res) => {
 const { username, password } = req.body;
 try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    // Generate a JWT
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.send({ token });
 } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error logging in' });
 }
});

const verifyToken = (req, res, next) => {
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];

 if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
 }

 jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).send({ error: 'Forbidden' });
    }
    req.user = user;
    next();
 });
};

app.get('/protected-route', verifyToken, (req, res) => {
 res.send('This is a protected route');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
