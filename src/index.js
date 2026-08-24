const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');            // seed data as fallback

const app = express();
const PORT = process.env.PORT || 8080;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ── MySQL connection (optional — falls back to in-memory if unavailable) ──────
let connection = null;
try {
    const mysql = require('mysql');
    try { require('dotenv').config(); } catch (e) { /* optional */ }

    const con = mysql.createConnection({
        host:     process.env.DB_HOST     || 'localhost',
        user:     process.env.DB_USER     || 'root',
        password: process.env.DB_PASSWORD || 'Nil@1308',
        database: process.env.DB_NAME     || 'test',
        multipleStatements: true,
        connectTimeout: 8000
    });

    con.connect(function (err) {
        if (err) {
            console.log('MySQL unavailable — using in-memory data:', err.message);
            connection = null;
        } else {
            console.log('Connection established with Database!');
            connection = con;
        }
    });
} catch (e) {
    console.log('mysql module error — using in-memory data');
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function isDigitOnly(value) {
    if (value === undefined || value === null) return false;
    return /^\d+$/.test(String(value).trim());
}
function isValidLimit(value)  { return isDigitOnly(value) && parseInt(value, 10) > 0; }
function isValidOffset(value) { return isDigitOnly(value); }

// ── Routes ────────────────────────────────────────────────────────────────────
/**
 * GET /api/orders
 * Query params:
 *   limit  – positive integer  (default: 10)
 *   offset – non-negative integer (default: 0)
 * Invalid values fall back to defaults silently.
 */
app.get('/api/orders', (req, res) => {
    const limit  = isValidLimit(req.query.limit)   ? parseInt(req.query.limit,  10) : 10;
    const offset = isValidOffset(req.query.offset) ? parseInt(req.query.offset, 10) : 0;

    // ── Use MySQL if connected, else in-memory data ───────────────────────────
    if (connection) {
        connection.query('SELECT * FROM orders LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
            if (err) {
                console.error('DB query error:', err.message);
                // fallback to in-memory on query error
                return res.status(200).json(data.slice(offset, offset + limit));
            }
            return res.status(200).json(results);
        });
    } else {
        // In-memory fallback — same data, same structure
        const results = data.slice(offset, offset + limit);
        return res.status(200).json(results);
    }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Zomato Orders API is running 🚀' });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;