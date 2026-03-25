import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';

dotenv.config();

const dropEmailIndex = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected successfully!');

    // Get the collection directly
    const collection = mongoose.connection.collection('contacts');

    // List all current indexes
    console.log('Fetching current indexes...');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(idx => idx.name));

    // Check if the problematic index exists
    const emailIndexExists = indexes.some(idx => idx.name === 'email_1');

    if (emailIndexExists) {
      console.log('Dropping the email_1 index...');
      await collection.dropIndex('email_1');
      console.log('Successfully dropped email_1 index! Users can now submit multiple requests with the same email.');
    } else {
      console.log('The email_1 index does not exist. No action needed.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error modifying indexes:', error);
    process.exit(1);
  }
};

dropEmailIndex();