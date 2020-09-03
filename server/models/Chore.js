const mongoose = require("mongoose");

const { Schema } = mongoose;

const choreSchema = new Schema({
  choreBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
});

module.exports = mongoose.model("Chore", choreSchema);