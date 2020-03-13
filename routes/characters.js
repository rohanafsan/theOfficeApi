const { Router } = require('express');

const pool = require('../db');
const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM characters ORDER BY id ASC', (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});

router.post('/', (request, response, next) => {
    const { firstname, secondname } = request.body;
    pool.query('INSERT INTO characters(firstname, secondname) VALUES($1, $2)', 
    [firstname, secondname], 
    (err, res) => {
        if (err) return next(err);
        response.redirect('/theOfficecharacters');
    });
});

module.exports=router;