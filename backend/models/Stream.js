const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  url: String,
});

module.exports = mongoose.model('Stream', StreamSchema);
