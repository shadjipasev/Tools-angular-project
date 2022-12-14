// const upload = require('../middlewares/upload');
const { createTool, getAllTools, getAllToolsType, getToolById, editTool, delById } = require('../services/toolServices');

const toolController = require('express').Router();


toolController.post('/create', async (req, res) => {

    // const image = { data: new Buffer.from(req.body.image, 'base64'), contentType: req.file.mimetype }
    const data = {
        name: req.body.name,
        material: req.body.material,
        country: req.body.country,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        type: req.body.type
    }
    try {
        await createTool(data);

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

toolController.get('/catalog', async(req, res) => {
    const getAll = await getAllTools()
    res.json(getAll)
});

toolController.get('/catalog/:type', async(req, res) => {
    const toolType = req.params.type
    const tools = await getAllToolsType(toolType)
    res.json(tools)
});

toolController.get('/details/:id', async(req, res) => {
    const toolId = req.params.id;
    const tool = await getToolById(toolId);
    // console.log(toolId)

    res.json(tool);
});

toolController.put('/edit/:id', async (req, res) => {
    const toolId = req.params.id
    const data = {
        name: req.body.name,
        material: req.body.material,
        country: req.body.country,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        type: req.body.type
    }
    try {
        await editTool(toolId, data);
        // res.json(toolId)
        // res.json(req.body)
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


toolController.get('/delete/:id', async(req, res) => {
    const toolId = req.params.id
    await delById(toolId)
});


module.exports = toolController;