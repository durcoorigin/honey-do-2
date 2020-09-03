const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require("moment");

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 300,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format("MMM Do, YYYY [at] hh:mm a"),
  },
});

module.exports = mongoose.model('Reaction', reactionSchema);