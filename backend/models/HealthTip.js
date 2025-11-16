const mongoose = require('mongoose');

const HealthTipSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add tip content'],
    trim: true,
    maxlength: [500, 'Content cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Nutrition', 'Hygiene', 'Prevention', 'Mental Health', 'Exercise', 'General']
  },
  translations: {
    english: String,
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  active: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Increment views when tip is accessed
HealthTipSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('HealthTip', HealthTipSchema);