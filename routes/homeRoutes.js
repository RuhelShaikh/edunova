const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Home route that lists all available API routes
router.get("/", homeController.getRoutesInfo);

module.exports = router;
