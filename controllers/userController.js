const User = require("../models/user");
const Transaction = require("../models/transaction");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIssuedBooks = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({
      user: userId,
      returnDate: null,
    }).populate("book");
    const issuedBooks = transactions.map((t) => t.book.name); // Assuming 'name' is the field in Book schema
    res.json(issuedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
