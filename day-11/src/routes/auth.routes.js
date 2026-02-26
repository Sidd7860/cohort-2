const express = require('express');
const user = require('../model/user.model');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists!.'
            });
        }

        // 2. Pehle user create karein (Kyunki ID tabhi milegi)
        const newUser = await user.create({ name, email, password });

        // 3. Ab token generate karein naye user (newUser) ke liye
        const token = jwt.sign(
            {
                id: newUser._id,      // Yahan newUser use karein
                email: newUser.email   // Yahan newUser use karein
            },
            process.env.jwtSecret
                 // Optional: Expiry add karna acchi practice hai
        );
        res.cookie('token', token)

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = authRouter;