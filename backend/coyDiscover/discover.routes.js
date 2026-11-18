const express = require("express");
const discoverController = require("./discover.controller");

const router = express.Router();

router.get("/me", discoverController.getCurrentUser);

router.get("/feed", discoverController.getFeed);

router.post("/swipe", discoverController.recordSwipe);

router.get("/matches", discoverController.getMatches);

module.exports = router;
