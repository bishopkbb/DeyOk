require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimitMiddleware');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🏥 Welcome to DeyOk Health API',
    version: '1.0.0',
    status: 'active',
    documentation: 'https://github.com/yourusername/deyok-health-app',
    endpoints: {
      auth: '/api/auth - User authentication',
      users: '/api/users - User management',
      reminders: '/api/reminders - Health reminders',
      tips: '/api/tips - Daily health tips',
      symptoms: '/api/symptoms - Symptom checker',
      firstaid: '/api/firstaid - First aid guides',
      facilities: '/api/facilities - Health facilities finder',
    },
    publicEndpoints: [
      'GET /api/tips',
      'GET /api/tips/daily',
      'GET /api/symptoms',
      'GET /api/firstaid',
      'GET /api/facilities',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ]
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/tips', require('./routes/tipRoutes'));
app.use('/api/symptoms', require('./routes/symptomRoutes'));
app.use('/api/firstaid', require('./routes/firstAidRoutes'));
app.use('/api/facilities', require('./routes/facilityRoutes'));

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use(errorHandler);

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
  console.log('\n📚 API Endpoints:'.cyan.bold);
  console.log('   🔐 Auth:       /api/auth'.gray);
  console.log('   👤 Users:      /api/users'.gray);
  console.log('   ⏰ Reminders:  /api/reminders'.gray);
  console.log('   💡 Tips:       /api/tips'.gray);
  console.log('   🔍 Symptoms:   /api/symptoms'.gray);
  console.log('   🚑 First Aid:  /api/firstaid'.gray);
  console.log('   🏥 Facilities: /api/facilities'.gray);
  console.log('\n✨ Server ready to handle requests!\n'.green);
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