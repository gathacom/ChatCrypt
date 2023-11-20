const express = require('express');
// const mysql = require('mysql2');
const path = require('path');
const {Sequelize} = require('sequelize');
const {sequelize} = require('./models');
const router = require('./routes');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname,'/public')));



app.listen(port, async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return console.log(`listening on port http://localhost:${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
