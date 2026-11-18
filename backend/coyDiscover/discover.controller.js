const discoverService = require("./discover.service");

const getCurrentUser = async (req, res, next) => {
  try {
    const name = await discoverService.getCurrentUserName();

    return res.json({ success: true, name });
  } catch (error) {
    next(error);
  }
};

const getFeed = async (req, res, next) => {
  try {
    const profiles = await discoverService.getFeed();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    next(error);
  }
};

const recordSwipe = async (req, res, next) => {
  try {
    const { target_id, action } = req.body || {};

    const result = await discoverService.recordSwipe(
      target_id,
      action
    );

    return res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const getMatches = async (req, res, next) => {
  try {
    const matches = await discoverService.getMatches();

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  getFeed,
  recordSwipe,
  getMatches,
};
