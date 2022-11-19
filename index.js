const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const port = 8000;

const router = require('./routes/checkout');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({ origin: true }));

app.use('/create-checkout-session', router);

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})