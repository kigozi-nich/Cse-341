const { MongoClient } = require('mongodb');

let client;
let db;

async function connectToDB() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(); // use default DB from connection string
  console.log('Connected to MongoDB');
  return db;
}

function getDB() {
  if (!db) throw new Error('Database not initialized. Call connectToDB first.');
  return db;
}

module.exports = { connectToDB, getDB };
