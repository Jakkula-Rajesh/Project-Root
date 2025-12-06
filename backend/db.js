const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'gvcc.db');


const db = new sqlite3.Database(dbPath, (err) => {
if (err) {
console.error('Failed to connect to DB', err);
} else {
console.log('Connected to SQLite at', dbPath);
}
});


module.exports = db;