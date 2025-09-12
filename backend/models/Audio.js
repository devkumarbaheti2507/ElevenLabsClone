const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
    language: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = mongoose.model("Audio", audioSchema);
