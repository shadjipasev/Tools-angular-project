const { register, login, logout } = require('../services/userServices');

const authController = require('express').Router();

authController.post('/logout', async (req, res) => {
        const token = await req.body.token;
        await logout(token)
        res.status(204).end;

})

authController.post('/register', async (req, res) => {
    try {
        const token = await register(req.body.username, req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.json(token);
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
})




module.exports = authController;