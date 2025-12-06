require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const enquiriesRouter = require('./routes/enquiries');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.json());


app.use('/api/products', productsRouter);
app.use('/api/enquiries', enquiriesRouter);


app.get('/', (req, res) => res.json({ ok: true, msg: 'GVCC Product Showcase API' }));


app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Internal server error' });
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));