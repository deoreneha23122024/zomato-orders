var mysql = require('mysql');

// Load .env file if present (local dev)
try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }

var con = mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME     || 'test',
    multipleStatements: true
});

con.connect(function (err) {
    if (err) return console.log('Failed to connect to MySQL server/database:', err.message);
    return console.log('Connection established with Database!');
});

module.exports = con;