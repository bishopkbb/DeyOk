const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    required: [true, 'Please add an activity'],
    enum: [
      'Drink Water',
      'Take Medication',
      'Exercise',
      'Check Blood Pressure',
      'Take Vitamins',
      'Walk',
      'Eat Meal',
      'Sleep',
      'Check Blood Sugar',
      'Eye Drops'
    ]
  },
  frequency: {
    type: String,
    required: [true, 'Please add frequency'],
    enum: [
      'Every hour',
      'Every 2 hours',
      'Every 3 hours',
      'Every 4 hours',
      'Every 6 hours',
      'Every 8 hours',
      'Every 12 hours',
      'Daily',
      'Twice daily',
      'Three times daily',
      'Weekly',
      'Custom'
    ]
  },
  time: {
    type: String,
    required: [true, 'Please add time']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  active: {
    type: Boolean,
    default: true
  },
  lastTriggered: {
    type: Date
  },
  completionHistory: [{
    completedAt: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: true
    },
    note: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Reminder', ReminderSchema);