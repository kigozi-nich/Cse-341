const { MongoClient } = require('mongodb');

let client;
let db;

async function connectToDB() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    const msg = 'MONGODB_URI is not defined. Add MONGODB_URI to your .env (example below) or set it in your environment.';
    console.error(msg);
    console.error("Example .env entry: MONGODB_URI='mongodb://localhost:27017/contacts'");
    throw new Error(msg);
  }
  try {
    // Basic sanity check
    if (typeof uri !== 'string' || !uri.includes('mongodb')) {
      throw new Error('MONGODB_URI does not look like a valid MongoDB connection string.');
    }
    client = new MongoClient(uri);
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to MongoDB with provided MONGODB_URI.');
    console.error('Provided MONGODB_URI:', uri ? uri.replace(/(?<=.{10}).+/,'***') : uri);
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
