const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connector');

const app = express();
const PORT = process.env.PORT || 8080;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ── Helpers ─────────────────────────────────────────────────────────────────
/**
 * Returns true only when `value` is a positive integer (> 0 for limit, >= 0 for offset).
 * Strings, floats, negatives and NaN all return false.
 */
function isValidPositiveInteger(value) {
    if (value === undefined || value === null) return false;
    const strVal = String(value).trim();
    // Must be a string of digits only (no decimal point, no sign, no spaces)
    if (!/^\d+$/.test(strVal)) return false;
    const num = parseInt(strVal, 10);
    return Number.isInteger(num) && num >= 0;
}

function isValidLimit(value) {
    if (!isValidPositiveInteger(value)) return false;
    return parseInt(value, 10) > 0;   // limit must be > 0
}

function isValidOffset(value) {
    return isValidPositiveInteger(value); // offset can be 0
}

// ── Routes ───────────────────────────────────────────────────────────────────
/**
 * GET /api/orders
 *
 * Query params:
 *   limit  – positive integer (default: 10)
 *   offset – non-negative integer (default: 0)
 *
 * Invalid values (strings, floats, negatives) → fall back to defaults.
 */
app.get('/api/orders', (req, res) => {
    const rawLimit  = req.query.limit;
    const rawOffset = req.query.offset;

    const limit  = isValidLimit(rawLimit)   ? parseInt(rawLimit,  10) : 10;
    const offset = isValidOffset(rawOffset) ? parseInt(rawOffset, 10) : 0;

    const sql = 'SELECT * FROM orders LIMIT ? OFFSET ?';

    connection.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error('DB query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json(results);
    });
});

// ── Health-check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Zomato Orders API is running 🚀' });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;