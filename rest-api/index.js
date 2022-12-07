const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const authController = require('./controllers.js/authController');
const toolController = require('./controllers.js/toolController');



const connectionString = 'mongodb://localhost:27017/tools';

start()


async function start() {

    await mongoose.connect(connectionString)
    console.log('Database: Works')

    const app = express();
    app.use(express.json());


    app.use(cors({
        credentials: true,
        origin: ["http://localhost:4200"],
        methods: ['HEAD', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));


    app.get('/', (req, res) => {
        res.json({ message: 'REST' })
    });

    app.use('/register', authController);
    app.use('/login', authController);
    app.use('/create', toolController)

    app.listen(5225, () => { console.log('REST service started') });

}
