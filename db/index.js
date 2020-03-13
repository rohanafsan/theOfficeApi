
require('dotenv').config()
const { Pool } = require ('pg');
const isProduction = process.env.NODE_ENV === 'production'
//const { user, host, database, password, port } = require('./db_configuration')

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    // user, 
    // host, 
    // database, 
    // password, 
    // port
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
});

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// });

module.exports = pool;