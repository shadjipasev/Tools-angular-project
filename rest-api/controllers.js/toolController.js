const { createTool } = require('../services/toolServices');

const toolController = require('express').Router();


toolController.post('/create', async (req, res) => {
    const data = {
        name: req.body.name,
        material: req.body.material,
        country: req.body.country,
        price: req.body.price,
        descripton: req.body.descripton,
        type: req.body.type
    }
    try {
        await createTool(data);
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
})

module.exports = toolController;