const FirstAidContent = require('../models/FirstAidContent');

exports.getFirstAidTopics = async (req, res) => {
  try {
    const topics = await FirstAidContent.find({ isActive: true }).sort('type');

    res.status(200).json({
      success: true,
      count: topics.length,
      data: topics
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getFirstAidByType = async (req, res) => {
  try {
    const content = await FirstAidContent.findOne({ 
      type: req.params.type,
      isActive: true 
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'First aid content not found'
      });
    }

    content.views += 1;
    await content.save();

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.createFirstAidContent = async (req, res) => {
  try {
    const content = await FirstAidContent.create(req.body);

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
