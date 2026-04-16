const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        res.json(user);
    } catch (error) {
        res.status(401);
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await authService.getUserProfile(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(404);
        next(error);
    }
};

module.exports = {
    register,
    login,
    getProfile
};
