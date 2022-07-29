const express = require("express");
const router = express.Router();
const book = require("../models/book");

const cors = require("cors");
const mongoose = require("mongoose");

// Find all books + find books with exact id
router.get("/book/:query", cors(), async (req, res) => {
  const { query } = req.params;

  if (query === "all") {
    const books = await book.find();
    res.send(books);
  } else {
    // Check if input is an valid ObjectId
    // If not doing this, app will crash whenever an invalid input is entered
    if (mongoose.Types.ObjectId.isValid(req.params.query)) {
      const books = await book.find({ _id: req.params.query });
      res.send(books);
    } else {
      next();
    }
  }
});

module.exports = router;
