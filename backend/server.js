const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://lms3ui-vishals-projects-1f0757c0.vercel.app' // Production frontend
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Allow CORS from specific origins
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Health check route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
