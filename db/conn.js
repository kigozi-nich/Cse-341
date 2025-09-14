const { MongoClient } = require('mongodb');

let client;
let db;

async function connectToDB() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  const fallbackUri = process.env.MONGODB_URI_FALLBACK;
  
  if (!uri) {
    const msg = 'MONGODB_URI is not defined. Add MONGODB_URI to your .env (example below) or set it in your environment.';
    console.error(msg);
    console.error("Example .env entry: MONGODB_URI='mongodb://localhost:27017/contacts'");
    throw new Error(msg);
  }

  // Helper function to connect with timeout
  const connectWithTimeout = (uri, timeout = 5000) => {
    return Promise.race([
      (async () => {
        const client = new MongoClient(uri);
        await client.connect();
        return client;
      })(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), timeout)
      )
    ]);
  };

  // Try primary URI first
  try {
    if (typeof uri !== 'string' || !uri.includes('mongodb')) {
      throw new Error('MONGODB_URI does not look like a valid MongoDB connection string.');
    }
    console.log('Attempting to connect to primary MongoDB URI...');
    client = await connectWithTimeout(uri, 5000);
    db = client.db(); // use default DB from connection string
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB with primary MONGODB_URI.');
    console.error('Error:', err.message);
    console.error('Provided MONGODB_URI:', uri ? uri.replace(/(?<=.{10}).+/,'***') : uri);
    
    // Try fallback if available
    if (fallbackUri) {
      console.log('Attempting fallback connection...');
      try {
        if (client) await client.close().catch(() => {}); // cleanup failed connection
        client = await connectWithTimeout(fallbackUri, 3000);
        db = client.db(); // use default DB from connection string
        console.log('Connected to MongoDB using fallback URI');
        return db;
      } catch (fallbackErr) {
        console.error('Failed to connect to MongoDB with fallback URI.');
        console.error('Fallback Error:', fallbackErr.message);
        console.error('Fallback URI:', fallbackUri ? fallbackUri.replace(/(?<=.{10}).+/,'***') : fallbackUri);
        throw fallbackErr;
      }
    }
    
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error('Database not initialized. Call connectToDB first.');
  return db;
}

module.exports = { connectToDB, getDB };
