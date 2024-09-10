const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users (Helper API)
router.get("/", userController.getAllUsers);

// Get books issued to a person
router.get("/:userId/issued-books", userController.getIssuedBooks);

module.exports = router;
