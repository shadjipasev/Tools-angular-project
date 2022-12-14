const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const error = require('./middlewares/error');
const authController = require('./controllers.js/authController');
const toolController = require('./controllers.js/toolController');
const session = require('./middlewares/session');
// const multer = require('multer')



const connectionString = 'mongodb://localhost:27017/tools';

start()


async function start() {

    await mongoose.connect(connectionString)
    console.log('Database: Works')

     

    const app = express();
    app.use(express.json());
    app.use(bodyParser.json());

    // app.use(cors())

    const corsOptions = {
        origin: 'http://localhost:4200',
        methods: ['HEAD', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
        Headers: ['Content-Type', 'X-Authorization']
    }

    app.use(cors(corsOptions));


    app.get('/', (req, res) => {
        res.json({ message: 'REST' })
    });
                                    
    app.use('/auth', authController);
    app.use('/data', toolController);

    app.use(session);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => { console.log('REST service started') });

}
