require('dotenv').config();
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
        console.error(`Port ${PORT} is already in use. Please free the port or set a different PORT environment variable.`);
        console.error('To find the process using the port (PowerShell):');
        console.error('  netstat -ano | findstr :3000');
        console.error('Then kill it with:');
        console.error('  taskkill /PID <PID> /F');
        process.exit(1);
      }
      console.error('Server error:', err);
      process.exit(1);
    });
  })
  .catch(err => console.error('DB connection failed', err));
