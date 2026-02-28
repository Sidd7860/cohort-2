const express = require('express');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required']},
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']},
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio:String,
    profilePicture:{type: String,
   default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'}
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
    