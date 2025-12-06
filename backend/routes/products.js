const express = require('express');
const db = require('../db');
const router = express.Router();


// GET /api/products?search=&category=&page=&limit=
router.get('/', (req, res) => {
const { search = '', category = '', page = 1, limit = 8 } = req.query;
const offset = (page - 1) * limit;


// Build WHERE clause
const where = [];
const params = [];
if (search) {
where.push('name LIKE ?');
params.push(`%${search}%`);
}
if (category) {
where.push('category = ?');
params.push(category);
}


const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : '';


const countSql = `SELECT COUNT(*) as count FROM products ${whereSQL}`;
db.get(countSql, params, (err, row) => {
if (err) return res.status(500).json({ error: 'DB error' });
const total = row.count;


const sql = `SELECT * FROM products ${whereSQL} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
db.all(sql, params.concat([limit, offset]), (err2, rows) => {
if (err2) return res.status(500).json({ error: 'DB error' });
res.json({ products: rows, meta: { total, page: Number(page), limit: Number(limit) } });
});
});
});


// GET /api/products/:id
router.get('/:id', (req, res) => {
const id = req.params.id;
db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
if (err) return res.status(500).json({ error: 'DB error' });
if (!row) return res.status(404).json({ error: 'Product not found' });
res.json({ product: row });
});
});


module.exports = router;