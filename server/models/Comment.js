const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");

const commentSchema = new Schema({
  commentBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format("MMM Do, YYYY [at] hh:mm a"),
  },
  firstName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
