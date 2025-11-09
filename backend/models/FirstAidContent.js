const mongoose = require('mongoose');

const FirstAidContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'burns',
      'cuts_bleeding',
      'snake_bite',
      'choking',
      'fainting',
      'cpr',
      'fractures',
      'poisoning',
      'heatstroke',
      'allergic_reaction',
      'seizures'
    ],
    unique: true
  },
  title: {
    english: { type: String, required: true },
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  icon: String,
  color: String,
  instructions: {
    dos: {
      english: [{ type: String, required: true }],
      pidgin: [String],
      yoruba: [String],
      igbo: [String],
      hausa: [String]
    },
    donts: {
      english: [{ type: String, required: true }],
      pidgin: [String],
      yoruba: [String],
      igbo: [String],
      hausa: [String]
    },
    steps: {
      english: [{ 
        step: Number,
        instruction: String,
        imageUrl: String
      }],
      pidgin: [{
        step: Number,
        instruction: String
      }],
      yoruba: [{
        step: Number,
        instruction: String
      }],
      igbo: [{
        step: Number,
        instruction: String
      }],
      hausa: [{
        step: Number,
        instruction: String
      }]
    }
  },
  audioUrls: {
    english: String,
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  videoUrl: String,
  warningMessage: {
    english: String,
    pidgin: String,
    yoruba: String,
    igbo: String,
    hausa: String
  },
  emergencyNumbers: [{
    name: String,
    number: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FirstAidContent', FirstAidContentSchema);
