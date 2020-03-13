const { Pool } = require ('pg');
const { user, host, database, password, port } = require('../secrets/db_configuration')

const pool = new Pool({user, host, database, password, port});

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// });

// router.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
// });

module.exports = pool;