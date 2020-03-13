const { Router } = require('express');

const pool = require('../db');
const router = Router();

router.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM characterquotes', (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});

// router.get('/:id', (request, response, next) => {
//     const { id } = request.params;
//     pool.query('SELECT * FROM characterquotes WHERE id = $1', [id], (err, res) => {
//         if (err) return next(err);
//         response.json(res.rows);
//     });
// });

router.get('/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query('SELECT quote FROM characterquotes WHERE firstname = $1 ORDER BY RANDOM() LIMIT 1', [id], (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});



router.post('/', (request, response, next) => {
    const { firstname, quote } = request.body;
    pool.query('INSERT INTO characterquotes(firstname, quote) VALUES($1, $2)', 
    [firstname, quote], 
    (err, res) => {
        if (err) return next(err);
        response.redirect('/theOfficequotes');
    });
});

router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const { firstname, quote } = request.body;
    const keys = ['firstname', 'quote'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        pool.query(`UPDATE characterquotes SET ${field}=($1) WHERE id=($2)`, 
        [request.body[field], id], 
        (err, res) => {
            if (err) return next(err);
            if (index === fields.length -1) response.redirect('/theOfficequotes');
        });
    });
});

router.delete('/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query('DELETE FROM characterquotes WHERE id=($1)', 
    [id], 
    (err, res) => {
        if (err) return next(err);
        response.redirect('/theOfficequotes');
    });
});



    // pool.query('SELECT COUNT(id) AS charcount FROM characterquotes', (err, res) => {
    //     if (err) return next(err);
    //     const random_index = Math.floor(Math.random() * res.rows[0].charcount);
    //     console.log(random_index);

module.exports = router;