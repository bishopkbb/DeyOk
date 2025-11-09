const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  name: {
    english: { type: String, required: true },
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  description: {
    english: String,
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  category: {
    type: String,
    required: true,
    enum: [
      'respiratory',
      'digestive',
      'cardiovascular',
      'neurological',
      'musculoskeletal',
      'skin',
      'fever',
      'pain',
      'general'
    ]
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe', 'emergency'],
    default: 'mild'
  },
  relatedConditions: [{
    condition: String,
    probability: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Symptom', SymptomSchema);
