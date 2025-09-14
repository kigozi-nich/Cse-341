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
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Visit http://localhost:${PORT} to test the API`);
    });
    
    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use!`);
        console.error('\n🔧 Solutions:');
        console.error('  1) Kill the process using the port:');
        console.error('     Windows: netstat -ano | findstr :' + PORT + ' then taskkill /PID <PID> /F');
        console.error('     macOS/Linux: lsof -ti:' + PORT + ' | xargs kill -9');
        console.error('  2) Use a different port: PORT=3001 npm start');
        console.error('  3) Set PORT in .env file\n');
        process.exit(1);
      }
      console.error('Server error:', err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
    console.error('\n🔧 Solutions:');
    console.error('  1) Check your .env file has MONGODB_URI set');
    console.error('  2) Ensure MongoDB is running locally or use a remote URI');
    console.error('  3) Verify the connection string format: mongodb://localhost:27017/dbname\n');
    process.exit(1);
  });
