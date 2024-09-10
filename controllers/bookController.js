const Book = require("../models/book");
const Transaction = require("../models/transaction");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  const { term } = req.query;
  try {
    const books = await Book.find({ name: { $regex: term, $options: "i" } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooksByRentRange = async (req, res) => {
  const { min, max } = req.query;
  try {
    const books = await Book.find({ rentPerDay: { $gte: min, $lte: max } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterBooks = async (req, res) => {
  const { category, term, minRent, maxRent } = req.query;
  try {
    const books = await Book.find({
      category,
      name: { $regex: term, $options: "i" },
      rentPerDay: { $gte: minRent, $lte: maxRent },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookTransactions = async (req, res) => {
  const { bookName } = req.params;
  try {
    const transactions = await Transaction.find().populate("book user");
    const matchingTransactions = transactions.filter(
      (t) => t.book.name.toLowerCase() === bookName.toLowerCase()
    );
    const currentIssue = matchingTransactions.find((t) => !t.returnDate);
    const pastIssues = matchingTransactions.filter((t) => t.returnDate);
    res.json({
      totalCount: matchingTransactions.length,
      currentlyIssued: currentIssue ? currentIssue.user.name : null,
      status: currentIssue ? "issued" : "not issued",
      pastIssues: pastIssues.map((t) => t.user.name),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalRentByBook = async (req, res) => {
  const { bookName } = req.params;
  try {
    const transactions = await Transaction.find().populate("book");
    const matchingTransactions = transactions.filter(
      (t) =>
        t.book.name.toLowerCase() === bookName.toLowerCase() && t.returnDate
    );
    const totalRent = matchingTransactions.reduce(
      (sum, t) => sum + t.rentAmount,
      0
    );
    res.json({ totalRent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
