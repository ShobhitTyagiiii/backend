// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/user');
const user = require('./routes/user');
//cors
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', user);

// Start the server
const PORT = process.env.PORT || 3000; // Change to a different port, e.g., 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
