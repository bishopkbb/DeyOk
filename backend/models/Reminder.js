const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    required: [true, 'Please specify the activity'],
    enum: [
      'drink_water',
      'take_medication',
      'exercise',
      'blood_pressure_check',
      'blood_sugar_check',
      'doctor_appointment',
      'custom'
    ]
  },
  customActivity: {
    type: String,
    maxlength: [100, 'Custom activity cannot be more than 100 characters']
  },
  frequency: {
    type: String,
    required: true,
    enum: ['once', 'daily', 'weekly', 'custom']
  },
  customFrequency: {
    interval: Number, // e.g., 3 (for every 3 hours)
    unit: {
      type: String,
      enum: ['minutes', 'hours', 'days', 'weeks']
    }
  },
  time: {
    type: String,
    required: [true, 'Please specify the time'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time (HH:MM)']
  },
  daysOfWeek: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastTriggered: Date,
  nextTrigger: Date,
  completionHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: false
    },
    note: String
  }]
}, {
  timestamps: true
});

// Index for efficient querying
ReminderSchema.index({ user: 1, isActive: 1 });
ReminderSchema.index({ nextTrigger: 1 });

module.exports = mongoose.model('Reminder', ReminderSchema);
