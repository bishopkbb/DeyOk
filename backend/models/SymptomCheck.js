const mongoose = require('mongoose');

const SymptomCheckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  symptoms: [{
    symptom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Symptom',
      required: true
    },
    duration: {
      value: Number,
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks', 'months']
      }
    },
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    }
  }],
  additionalInfo: {
    temperature: Number,
    recentTravel: Boolean,
    travelLocation: String,
    knownExposure: Boolean,
    medications: [String],
    otherSymptoms: String
  },
  assessment: {
    possibleConditions: [{
      name: String,
      probability: String,
      description: String
    }],
    recommendations: [String],
    urgencyLevel: {
      type: String,
      enum: ['non_urgent', 'consult_doctor', 'urgent', 'emergency']
    }
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date
}, {
  timestamps: true
});

// Index for user history
SymptomCheckSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('SymptomCheck', SymptomCheckSchema);
