

const userModel = require('../model/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');




async function registerController(req, res) {
const { username, email, password,bio, profilePicture } = req.body;

const isUserExist = await userModel.findOne({ $or: [{ username }, { email }] });

if (isUserExist) {
    return res.status(400).json({ message: 'User already exists'+(isUserExist.email== email?"email already exists": "username already exists") });}


const hash= crypto.createHash('sha256').update(password).digest('hex')
const user = await userModel.create({ username, email, password: hash,bio, profilePicture });

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
res. cookie('token', token );
res.status(201).json({ message: 'User registered successfully', user: { username: user.username, email: user.email, bio: user.bio, profilePicture: user.profilePicture }, token });

}

async function loginController(req, res) {
const { email,username, password } = req.body;

const user = await userModel.findOne({ $or:
     [{ email: email }, 
    { username: username }] });

if (!user) {
    return res.status(400).json({ message: 'user not found' });
}

const isPasswordValid = crypto.createHash('sha256').update(password).digest('hex') === user.password;
if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });}

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
res.cookie('token', token);
res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, bio: user.bio, profilePicture: user.profilePicture }, token });

}


module.exports = { registerController, loginController };