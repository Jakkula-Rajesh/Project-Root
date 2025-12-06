const express = require('express');
const db = require('../db');
const router = express.Router();


// POST /api/enquiries
router.post('/', (req, res) => {
const { product_id, name, email, phone = '', message } = req.body;
if (!name || !email || !message) {
return res.status(400).json({ error: 'Missing required fields' });
}
// Basic email validation
const emailRegex = /\S+@\S+\.\S+/;
if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email' });


const sql = `INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
db.run(sql, [product_id || null, name, email, phone, message], function (err) {
if (err) return res.status(500).json({ error: 'DB error' });
res.status(201).json({ id: this.lastID, message: 'Enquiry created' });
});
});


// GET /api/enquiries
router.get('/', (req, res) => {
db.all('SELECT * FROM enquiries ORDER BY created_at DESC', [], (err, rows) => {
if (err) return res.status(500).json({ error: 'DB error' });
res.json({ enquiries: rows });
});
});


module.exports = router;