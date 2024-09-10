const Transaction = require("../models/transaction");
const User = require("../models/user");
const Book = require("../models/book");

exports.issueBook = async (req, res) => {
  const { bookName, userId, issueDate } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const transaction = new Transaction({
      book: book._id,
      user: user._id,
      issueDate,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { bookName, userId, returnDate } = req.body;
  try {
    const transaction = await Transaction.findOne({
      user: userId,
      returnDate: null,
    }).populate("book");
    if (!transaction || transaction.book.name !== bookName) {
      return res
        .status(404)
        .json({ message: "No active transaction found for this book" });
    }
    const rentDays = Math.ceil(
      (new Date(returnDate) - new Date(transaction.issueDate)) /
        (1000 * 60 * 60 * 24)
    );
    const rentAmount = rentDays * transaction.book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.rentAmount = rentAmount;
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("user book");
    res.json(
      transactions.map((t) => ({
        bookName: t.book.name,
        issuedTo: t.user.name,
        issueDate: t.issueDate,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
