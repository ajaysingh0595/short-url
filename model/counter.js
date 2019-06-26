const mongoose = require('mongoose');
var countersSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

module.exports.default = mongoose.model('Counter', countersSchema);