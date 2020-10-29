// app/models/path.js

var mongoose = require("mongoose"); // layer between the routes and the database
var findOrCreate = require("mongoose-findorcreate"); // neat little add-on to mongoose

var pathSchema = mongoose.Schema({
  title: String,
  category: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  rating: { type: Number, default: 0.0 },
  numReview: { type: Number, default: 0 },
});

pathSchema.plugin(findOrCreate);

module.exports = mongoose.model("Path", pathSchema);
