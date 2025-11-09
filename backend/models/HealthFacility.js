const mongoose = require('mongoose');

const HealthFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide facility name'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'hospital',
      'clinic',
      'pharmacy',
      'laboratory',
      'emergency_center',
      'specialist_center',
      'primary_health_center'
    ]
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  },
  contact: {
    phone: [String],
    email: String,
    website: String
  },
  services: [{
    type: String,
    enum: [
      'emergency',
      'outpatient',
      'inpatient',
      'laboratory',
      'pharmacy',
      'maternity',
      'pediatrics',
      'surgery',
      'dental',
      'optical',
      'mental_health',
      'radiology',
      'dialysis'
    ]
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  is24Hours: {
    type: Boolean,
    default: false
  },
  hasEmergency: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  imageUrls: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Geospatial index for location-based queries
HealthFacilitySchema.index({ 'location.coordinates': '2dsphere' });
HealthFacilitySchema.index({ type: 1, isActive: 1 });
HealthFacilitySchema.index({ city: 1, state: 1 });

module.exports = mongoose.model('HealthFacility', HealthFacilitySchema);
