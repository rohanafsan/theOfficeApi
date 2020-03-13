const express = require('express');

const characterquotes = require('./routes/characterquotes');
const characters = require('./routes/characters');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/theOfficequotes', characterquotes);
app.use('/theOfficecharacters', characters);

app.use((err, req, res, next) => {
    res.json(err);
});

module.exports = app;
