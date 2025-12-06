
// Runs schema.sql and seed.sql to create a SQLite DB at data/gvcc.db
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();


const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const dbPath = path.join(dataDir, 'gvcc.db');
const db = new sqlite3.Database(dbPath);


const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
const seed = fs.readFileSync(path.join(__dirname, '..', 'seed.sql'), 'utf8');


db.exec(schema, (err) => {
if (err) return console.error('Failed running schema', err);
db.exec(seed, (err2) => {
if (err2) return console.error('Failed running seed', err2);
console.log('Seed completed. DB at', dbPath);
db.close();
});
});