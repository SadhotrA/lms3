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

// Use CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Allow cookies if needed
}));

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
