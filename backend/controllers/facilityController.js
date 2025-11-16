const HealthFacility = require('../models/HealthFacility');

exports.getFacilities = async (req, res) => {
  try {
    const { type, city, state, hasEmergency } = req.query;
    let query = { isActive: true };
    
    if (type) query.type = type;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (state) query['location.state'] = new RegExp(state, 'i');
    if (hasEmergency) query.hasEmergency = hasEmergency === 'true';

    const facilities = await HealthFacility.find(query).sort('-ratings.average');

    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getNearbyFacilities = async (req, res) => {
  try {
    const { longitude, latitude, distance = 10, type } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide longitude and latitude'
      });
    }

    const query = {
      isActive: true,
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: distance * 1000
        }
      }
    };

    if (type) query.type = type;

    const facilities = await HealthFacility.find(query);

    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getFacility = async (req, res) => {
  try {
    const facility = await HealthFacility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: 'Facility not found'
      });
    }

    res.status(200).json({
      success: true,
      data: facility
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const facility = await HealthFacility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: 'Facility not found'
      });
    }

    const alreadyReviewed = facility.reviews.find(
      r => r.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Facility already reviewed'
      });
    }

    facility.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    const totalRating = facility.reviews.reduce((acc, item) => item.rating + acc, 0);
    facility.ratings.average = totalRating / facility.reviews.length;
    facility.ratings.count = facility.reviews.length;

    await facility.save();

    res.status(201).json({
      success: true,
      data: facility
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
