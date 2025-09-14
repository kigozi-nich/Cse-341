require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('MongoDB connection successful!');
    await client.close();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

testConnection();
