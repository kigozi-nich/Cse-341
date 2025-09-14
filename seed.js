require('dotenv').config();
const { MongoClient } = require('mongodb');
const contacts = require('./data/contacts.json');

async function seed() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('contacts').insertMany(contacts);
    console.log(`Inserted ${result.insertedCount} contacts`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
