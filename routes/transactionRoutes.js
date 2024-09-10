const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Issue a book
router.post("/issue", transactionController.issueBook);

// Return a book
router.post("/return", transactionController.returnBook);

// Get transactions by date range
router.get("/date-range", transactionController.getTransactionsByDateRange);

module.exports = router;
