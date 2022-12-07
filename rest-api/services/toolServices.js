const Tool = require("../models/Tool");

async function createTool(data){
    await Tool.create(data);
}


module.exports = {
    createTool
}