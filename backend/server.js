require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Test route
app.get('/', (req, res) => {
  res.json({
    message: '🏥 Welcome to DeyOk Health API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      reminders: '/api/reminders',
      tips: '/api/tips',
      symptoms: '/api/symptoms',
      firstaid: '/api/firstaid',
      facilities: '/api/facilities',
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
  });
});

// API Routes (will be added later)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/reminders', require('./routes/reminderRoutes'));
// app.use('/api/tips', require('./routes/tipRoutes'));
// app.use('/api/symptoms', require('./routes/symptomRoutes'));
// app.use('/api/firstaid', require('./routes/firstAidRoutes'));
// app.use('/api/facilities', require('./routes/facilityRoutes'));

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════'.green.bold);
  console.log(`🚀 DeyOk Backend Server Running`.green.bold);
  console.log(`📍 Port: ${PORT}`.yellow);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`.yellow);
  console.log(`🔗 URL: http://localhost:${PORT}`.cyan.underline);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`.cyan.underline);
  console.log('═══════════════════════════════════════════════════'.green.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});
