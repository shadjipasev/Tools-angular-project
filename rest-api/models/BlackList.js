const { Schema, model } = require("mongoose");

const blackListSchema = new Schema({
    tokenBlackList: {type: String, required: true}
});

const BlackList = model('BlackList', blackListSchema)

blackListSchema.index({ tokenBlackList: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});


module.exports = BlackList;