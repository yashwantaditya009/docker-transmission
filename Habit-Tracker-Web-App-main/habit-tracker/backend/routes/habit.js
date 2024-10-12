const express = require('express');
const Habit = require('../models/Habit');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access Denied');
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json('Invalid Token');
    }
};

// Create new habit
router.post('/', verifyToken, async (req, res) => {
    const newHabit = new Habit({
        userId: req.user._id,
        title: req.body.title,
        days: req.body.days,
        progress: []
    });

    try {
        const savedHabit = await newHabit.save();
        res.status(200).json(savedHabit);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all habits for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
