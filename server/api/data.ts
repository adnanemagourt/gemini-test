import { MongoClient } from 'mongodb';

// MongoDB connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Connect to MongoDB
async function connect() {
  await client.connect();
  return client.db().collection('data');
}

export default defineEventHandler(async (event) => {
  const collection = await connect();

  if (event.method === 'GET') {
    // Fetch all documents from the collection
    const documents = await collection.find({}).toArray();
    return documents;
  }

  if (event.method === 'POST') {
    // Insert a new document into the collection
    const body = await readBody(event);
    const result = await collection.insertOne(body);
    return { success: true, insertedId: result.insertedId };
  }
});