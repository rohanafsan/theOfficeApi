const express = require('express');

const characterquotes = require('./routes/characterquotes');
const characters = require('./routes/characters');


// const steamScrape = require('./steamScrape');

// console.log()
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/theOfficequotes', characterquotes);
app.use('/theOfficecharacters', characters);

app.use((err, req, res, next) => {
    res.json(err);
});

module.exports = app;

// app.get('/steamScrape/random', (req, res) => {
//     const random_index = Math.floor(Math.random() * steamScrape.length);
//     const rgames = steamScrape[random_index];
//     res.json(rgames);
// });

// app.get('/steamScrape/:name', (req, res) => {
//     res.json(steamScrape.find(s => s.name == req.params.name));
// });

// app.delete('/steamScrape/:name', (req, res) => {
//     const { name } = req.params;

//     const news = steamScrape.filter(s => s.name != name);
//     fs.writeFile('./steamScrape.json', JSON.stringify(news), err => console.log(err));
//     res.json(news);
// });

// module.exports = app;



