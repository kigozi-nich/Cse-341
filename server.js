require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/conn');

// Load environment variables from repository root first, then from the inner folder (inner overrides)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true });
const app = express();
app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('Hello World'));

// routes
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
  .catch(err => console.error('DB connection failed', err));
