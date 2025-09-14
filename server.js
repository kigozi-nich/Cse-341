const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/conn');

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('Hello World! Server is running on localhost'));

// routes
app.use('/api/contacts', require('./routes/contacts'));

const PORT = parseInt(process.env.PORT, 10) || 3000;

function startWithRetry(port, maxAttempts = 5) {
  const attempt = (p, remaining) => {
    const server = app.listen(p, () => {
      console.log(`Server listening on http://localhost:${p}`);
      console.log(`To access the server, visit: http://localhost:${p}`);
    });

    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${p} is already in use.`);
        if (remaining > 0) {
          const next = p + 1;
          console.log(`Trying port ${next} (remaining attempts: ${remaining - 1})...`);
          // small delay to avoid tight loop
          setTimeout(() => attempt(next, remaining - 1), 300);
        } else {
          console.error('No available ports found after retries. Exiting.');
          process.exit(1);
        }
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  };

  attempt(port, maxAttempts);
}

// Start server with or without database connection
async function startServer() {
  try {
    await connectToDB();
    console.log('Starting server with database connection...');
    startWithRetry(PORT, 5);
  } catch (err) {
    console.error('DB connection failed:', err.message);
    console.log('Starting server without database connection for testing...');
    console.log('Note: API endpoints that require database will not work.');
    startWithRetry(PORT, 5);
  }
}

startServer();
