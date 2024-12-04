const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User =  require('../models/user.js');

const router = express.Router();

// Registration

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        // Generate JWT
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '7d' });
        
        res.status(201).json({ token });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

});

//login

router.post('/login',async (req, res) => {
const {email, password} = req.body;
try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ error: 'User Not exists' });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ userId: existingUser._id }, 'your_secret_key', { expiresIn: '7d' });
    
    res.json({ token });
} catch (error) {
    console.log("error",error);
}})

module.exports = router;