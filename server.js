const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/conn');

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('Hello World'));

// routes
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the process using the port or set a different PORT env var.`);
        console.error('To find and kill the process on Windows:');
        console.error('  1) Run: netstat -ano | findstr :3000');
        console.error('  2) Note the PID and run: taskkill /PID <PID> /F');
        process.exit(1);
      }
      console.error('Server error:', err);
      process.exit(1);
    });
  })
  .catch(err => console.error('DB connection failed', err));
