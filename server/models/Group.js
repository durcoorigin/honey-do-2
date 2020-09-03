const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
    }, 
    groupPassword: {
        type: String,
        required: true,
        minlength: 6
    }
});

module.exports = mongoose.model('Group', groupSchema);