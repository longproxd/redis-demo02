const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    stock: Number,
    source: String,
  },
  { collection: "book" }
);

module.exports = mongoose.model("book", bookSchema);
