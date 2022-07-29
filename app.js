const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://admin:admin@dichoho.axyzp.mongodb.net/book");

app.use("/", require("./routes/bookRoute"));
app.use("/", require("./routes/bookCacheRoute"));

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
