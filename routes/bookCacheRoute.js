const express = require("express");
const router = express.Router();
const book = require("../models/book");

const redis = require("redis");
const client = redis.createClient();

const cors = require("cors");
const mongoose = require("mongoose");

// Find all books + find books with exact id
router.get("/book_cache/:query", cors(), cache, async (req, res) => {
  const { query } = req.params;
  // Redis key = entity name + ':' + entity identifier + ':' + entity attribute
  const redisKey = "book:" + query + ":id";

  if (redisKey === "book:all:id") {
    const books = await book.find();
    client.setex(redisKey, 3600, JSON.stringify(books));
    res.send(books);
  } else {
    // Check if input is an valid ObjectId
    // If not doing this, app will crash whenever an invalid input is entered
    if (mongoose.Types.ObjectId.isValid(req.params.query)) {
      const books = await book.find({ _id: req.params.query });
      client.setex(redisKey, 3600, JSON.stringify(books));
      res.send(books);
    } else {
      next();
    }
  }
});

// Redis middleware for caching
function cache(req, res, next) {
  const { query } = req.params;
  const redisKey = "book:" + query + ":id";

  client.get(redisKey, (err, data) => {
    if (data) {
      res.send(data);
    } else {
      next();
    }
  });
}

module.exports = router;
