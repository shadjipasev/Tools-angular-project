const error = require('express').Router();

error.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
    next()
})

module.exports = error