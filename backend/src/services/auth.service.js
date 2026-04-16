const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

const registerUser = async (userData) => {
    const { name, email, password, role, dateOfJoining } = userData;

    if (!name || !email || !password) {
        throw new Error('Please provide all required fields (name, email, password)');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        dateOfJoining
    });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        };
    } else {
        throw new Error('Invalid user data');
    }
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        };
    } else {
        throw new Error('Invalid email or password');
    }
};

const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('name email role dateOfJoining');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
