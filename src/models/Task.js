const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
    title: String,
    description: String,
    id: Number,
    date: Date
});

module.exports = mongoose.model('Task', Task);

