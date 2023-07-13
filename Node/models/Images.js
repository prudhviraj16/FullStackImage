const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  avatar: {
    type: String
  },
});

module.exports = mongoose.model("Images", ImageSchema);


