const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    days: { type: Array, default: [] },
    progress: { type: Array, default: [] },
});

module.exports = mongoose.model('Habit', HabitSchema);
