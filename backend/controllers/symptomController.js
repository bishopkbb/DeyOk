// @desc    Get all symptoms
// @route   GET /api/symptoms
// @access  Public
exports.getSymptoms = async (req, res) => {
  try {
    const symptoms = [
      { name: 'Headache', category: 'General' },
      { name: 'Fever', category: 'General' },
      { name: 'Cough', category: 'Respiratory' },
      { name: 'Fatigue', category: 'General' },
      { name: 'Sore Throat', category: 'Respiratory' },
      { name: 'Body Aches', category: 'Musculoskeletal' },
      { name: 'Nausea', category: 'Digestive' },
      { name: 'Diarrhea', category: 'Digestive' },
      { name: 'Shortness of Breath', category: 'Respiratory' },
      { name: 'Chest Pain', category: 'Cardiovascular' },
      { name: 'Dizziness', category: 'Neurological' },
      { name: 'Loss of Appetite', category: 'General' },
      { name: 'Runny Nose', category: 'Respiratory' },
      { name: 'Skin Rash', category: 'Dermatological' },
      { name: 'Joint Pain', category: 'Musculoskeletal' },
      { name: 'Abdominal Pain', category: 'Digestive' }
    ];

    res.status(200).json({
      success: true,
      count: symptoms.length,
      data: symptoms
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check symptoms
// @route   POST /api/symptoms/check
// @access  Private
exports.checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide symptoms as an array'
      });
    }

    // Simple logic for determining possible conditions
    let possibleConditions = [];

    const symptomList = symptoms.map(s => s.toLowerCase());

    // Check for common conditions based on symptoms
    if (symptomList.includes('fever') || symptomList.includes('headache') || symptomList.includes('cough')) {
      possibleConditions.push('Common Cold');
      possibleConditions.push('Influenza (Flu)');
    }

    if (symptomList.includes('chest pain') || symptomList.includes('shortness of breath')) {
      possibleConditions.push('Respiratory Infection');
    }

    if (symptomList.includes('nausea') || symptomList.includes('diarrhea') || symptomList.includes('abdominal pain')) {
      possibleConditions.push('Gastroenteritis');
      possibleConditions.push('Food Poisoning');
    }

    if (symptomList.includes('sore throat') || symptomList.includes('runny nose')) {
      possibleConditions.push('Upper Respiratory Tract Infection');
    }

    if (symptomList.includes('joint pain') || symptomList.includes('body aches')) {
      possibleConditions.push('Viral Infection');
      possibleConditions.push('Arthritis');
    }

    if (possibleConditions.length === 0) {
      possibleConditions.push('General Malaise');
      possibleConditions.push('Stress-related Symptoms');
    }

    // Remove duplicates
    possibleConditions = [...new Set(possibleConditions)];

    const result = {
      symptoms: symptoms,
      possibleConditions: possibleConditions,
      recommendation: 'Please consult a qualified healthcare professional for accurate diagnosis and treatment. This is only a preliminary assessment.'
    };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get symptom history
// @route   GET /api/symptoms/history
// @access  Private
exports.getSymptomHistory = async (req, res) => {
  try {
    // For now, return empty array
    // You can implement actual history tracking later
    res.status(200).json({
      success: true,
      data: []
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};