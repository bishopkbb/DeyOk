const HealthTip = require('../models/HealthTip');

// @desc    Get all health tips
// @route   GET /api/tips
// @access  Public
exports.getTips = async (req, res, next) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category) query.category = category;
    
    const tips = await HealthTip.find(query).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: tips.length,
      data: tips
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get daily health tip (random)
// @route   GET /api/tips/daily
// @access  Public
exports.getDailyTip = async (req, res, next) => {
  try {
    const count = await HealthTip.countDocuments();
    
    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tips available. Please run the seed script.'
      });
    }
    
    const random = Math.floor(Math.random() * count);
    const tip = await HealthTip.findOne().skip(random);
    
    res.status(200).json({
      success: true,
      data: tip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single tip
// @route   GET /api/tips/:id
// @access  Public
exports.getTip = async (req, res, next) => {
  try {
    const tip = await HealthTip.findById(req.params.id);
    
    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new tip (Admin only)
// @route   POST /api/tips
// @access  Private/Admin
exports.createTip = async (req, res, next) => {
  try {
    const tip = await HealthTip.create(req.body);
    
    res.status(201).json({
      success: true,
      data: tip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update tip (Admin only)
// @route   PUT /api/tips/:id
// @access  Private/Admin
exports.updateTip = async (req, res, next) => {
  try {
    const tip = await HealthTip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete tip (Admin only)
// @route   DELETE /api/tips/:id
// @access  Private/Admin
exports.deleteTip = async (req, res, next) => {
  try {
    const tip = await HealthTip.findById(req.params.id);
    
    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found'
      });
    }
    
    await tip.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};