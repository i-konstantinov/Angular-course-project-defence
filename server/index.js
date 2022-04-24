const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');

const carAdsController = require('./controllers/carAds');
const usersController = require('./controllers/users');

start();

async function start() {
    try {
        mongoose.connect('mongodb://localhost:27017/carMarketREST', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    } catch (err) {
        console.error("Database connection error");
        process.exit(1);
    }
    
    const app = express();
    app.use(express.json());
    
    app.use(cors());
    app.use(auth());

    app.use('/catalog', carAdsController);
    app.use('/user', usersController);
    // app.get('/', (req, res) => res.json({ message: "REST service operational" }));
    
    app.listen(3000, () => console.log("REST service started on port 3000"));
}