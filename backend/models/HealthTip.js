const mongoose = require('mongoose');

const HealthTipSchema = new mongoose.Schema({
  title: {
    english: { type: String, required: true },
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  content: {
    english: { type: String, required: true },
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  category: {
    type: String,
    required: true,
    enum: [
      'nutrition',
      'hygiene',
      'prevention',
      'mental_health',
      'exercise',
      'sleep',
      'chronic_disease',
      'maternal_health',
      'child_health',
      'general'
    ]
  },
  tags: [String],
  imageUrl: String,
  source: String,
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for efficient querying
HealthTipSchema.index({ category: 1, isActive: 1 });
HealthTipSchema.index({ tags: 1 });

module.exports = mongoose.model('HealthTip', HealthTipSchema);
