const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connector');

const app = express();
const PORT = process.env.PORT || 8080;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ── Helpers ───────────────────────────────────────────────────────────────────
/**
 * Returns true only when value is a string of pure digits (no dot, no sign).
 */
function isDigitOnly(value) {
    if (value === undefined || value === null) return false;
    return /^\d+$/.test(String(value).trim());
}

function isValidLimit(value) {
    if (!isDigitOnly(value)) return false;
    return parseInt(value, 10) > 0;        // limit must be > 0
}

function isValidOffset(value) {
    return isDigitOnly(value);             // offset can be 0
}

// ── Routes ────────────────────────────────────────────────────────────────────
/**
 * GET /api/orders
 * Query params:
 *   limit  – positive integer  (default: 10)
 *   offset – non-negative integer (default: 0)
 *
 * Invalid values (strings, floats, negatives) fall back to defaults silently.
 */
app.get('/api/orders', (req, res) => {
    const limit  = isValidLimit(req.query.limit)   ? parseInt(req.query.limit,  10) : 10;
    const offset = isValidOffset(req.query.offset) ? parseInt(req.query.offset, 10) : 0;

    const sql = 'SELECT * FROM orders LIMIT ? OFFSET ?';

    connection.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error('DB query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json(results);
    });
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Zomato Orders API is running 🚀' });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;