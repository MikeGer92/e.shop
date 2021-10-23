const express = require('express');
const cors = require('cors');
const { addItems} = require('./commonFunctions');
const {GOODS_PATH, BASKET_GOODS_PATH, ADD_GOODS_PATH} = require('./constants');
require('./commonFunctions');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('./static'));
app.patch('/api', (res, req) => {
    console.log('body-', res.body);
    addItems(BASKET_GOODS_PATH, res.body).then((items) => {
        req.setHeader('Content-type', 'application/json');
        req.send(items);
    });   
});

app.use('/', (res, req, next) => {
    console.log('request');
    next();
});

app.get('/', (res, req) => {
    req.send('hello World');
});

app.listen('8000', () => {
    console.log('server is run');
});

