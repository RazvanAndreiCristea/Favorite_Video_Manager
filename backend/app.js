const express = require('express');
const cors = require("cors");
const app = express();
const port = 3001;

// Middleware to parse JSON in requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Import your route files
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
// Add more route imports as needed

// Use the routes
app.use('/videos', videoRoutes);
app.use('/users', userRoutes);
// Add more route usage as needed

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});