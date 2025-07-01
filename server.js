const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

// Initialize the Express application
const app = express();

app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE', // Allow specific methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
}))
// Middleware to parse JSON
app.use(express.json());

// Use the student routes
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });