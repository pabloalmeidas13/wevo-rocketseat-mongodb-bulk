'use strict'

//Configuração API - Express
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

//Rotas
const indexRoute = require('./src/routes/router');

//Inicialização da API
app.listen(port, () => console.log(`Server - MongoDB Insertion - listening on port [${port}] !`));

//Receber JSON na API - Express
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

//Configuração do CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Register Routes
app.use('/', indexRoute);

module.exports = app;