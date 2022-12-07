const { createTool } = require('../services/toolServices');

const toolController = require('express').Router();


toolController.post('/create', async (req, res) => {
    const data = {
        name: req.body.name,
        material: req.body.material,
        country: req.body.country,
        price: req.body.price,
        type: req.body.type
    }

    try {
        await createTool(data);
    } catch (error) {
        res.status(401);
    }
})

module.exports = toolController;