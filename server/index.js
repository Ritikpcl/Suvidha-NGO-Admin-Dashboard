const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const letterRoutes = require('./Routes/letterRoutes')
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

//MongoDB connection
const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/letter', letterRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});