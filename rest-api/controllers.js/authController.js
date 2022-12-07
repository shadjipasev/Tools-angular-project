const { register, login } = require('../services/userServices');

const authController = require('express').Router();

authController.post('/register', async (req, res) => {
    try {
        const token = await register(req.body.username, req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
})


module.exports = authController;