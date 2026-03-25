import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected successfully!');

    // Check if the user already exists
    const existingUser = await User.findOne({ email: 'admin@emmasdale.org' });
    if (existingUser) {
      console.log('Superadmin user already exists!');
      process.exit(0);
    }

    // Create the superadmin user
    // The pre-save hook in User.ts will automatically hash this password
    // and assign the 'superadmin' role because the position is 'developer'
    const superAdmin = await User.create({
      name: 'System Admin',
      email: 'admin@emmasdale.org',
      password: 'securepassword123', // Change this to whatever you want
      position: 'developer', // This triggers the 'superadmin' role assignment
    });

    console.log('Successfully created Superadmin user!');
    console.log('Email:', superAdmin.email);
    console.log('Role:', superAdmin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
};

createSuperAdmin();