const { MongoClient } = require('mongodb');

let client;
let db;

async function connectToDB() {
  if (db) return db;
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set. Check your .env file.');
  }
  
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    connectTimeoutMS: 10000,
  });
  
  await client.connect();
  db = client.db(); // use default DB from connection string
  console.log('Connected to MongoDB');
  return db;
}

function getDB() {
  if (!db) throw new Error('Database not initialized. Call connectToDB first.');
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connectToDB, getDB, closeDB };
