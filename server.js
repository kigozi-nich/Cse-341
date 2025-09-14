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

console.log(`Starting server...`);
console.log(`Port configuration: ${PORT} (from ${process.env.PORT ? 'environment variable' : 'default'})`);

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server successfully started!`);
      console.log(`🌐 Server listening on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/`);
      console.log(`📋 API endpoints: http://localhost:${PORT}/api/contacts`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err.message);
    console.log(`\n💡 To fix this error:`);
    console.log(`1. Create a .env file in the project root`);
    console.log(`2. Add your MongoDB connection string: MONGODB_URI=mongodb://localhost:27017/contacts`);
    console.log(`3. Ensure MongoDB is running\n`);
    
    // Start server anyway for testing API structure
    app.listen(PORT, () => {
      console.log(`⚠️  Server started WITHOUT database on port ${PORT}`);
      console.log(`📍 Health check available: http://localhost:${PORT}/`);
    });
  });
