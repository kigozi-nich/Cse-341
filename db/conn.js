const { MongoClient } = require('mongodb');

let client;
let db;

async function connectToDB() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Please add it to your .env (Cse-341/.env) or environment variables.');
    console.error("Example: MONGODB_URI=mongodb://localhost:27017/contacts");
    throw new Error('MONGODB_URI not provided');
  }
  if (typeof uri !== 'string' || !uri.includes('mongodb')) {
    console.error('MONGODB_URI does not look like a valid MongoDB connection string:', uri);
    throw new Error('Invalid MONGODB_URI');
  }
  try {
    client = new MongoClient(uri);
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to MongoDB with provided MONGODB_URI.');
    console.error('Provided MONGODB_URI (redacted):', typeof uri === 'string' ? uri.replace(/(.{10}).+/, '$1***') : uri);
    throw err;
  }
  db = client.db(); // use default DB from connection string
  console.log('Connected to MongoDB');
  return db;
}

function getDB() {
  if (!db) throw new Error('Database not initialized. Call connectToDB first.');
  return db;
}

module.exports = { connectToDB, getDB };
