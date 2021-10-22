const cors = require('cors');
const express = require('express');

const app = express();

app.use('/', (res, req, next) => {
    console.log('request');
    next();
});

app.use(express.static('./static/'));
app.use(cors());

app.get('/', (res, req) => {
    req.send('hello World');
});

app.listen('8000', () => {
    console.log('server is run');
});