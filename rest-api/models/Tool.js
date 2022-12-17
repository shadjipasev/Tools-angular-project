const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {type: String, required: true},
    material: {type: String, required: true},
    country: {type: String, required: true},
    price: {type: String, required: true},
    type: {type: String, required: true},
});

const Tool = model('Tool', userSchema)


module.exports = Tool;