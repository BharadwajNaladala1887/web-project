import mongoose from 'mongoose';
import User from '../schema/User.js'; // Adjusted path to the User model

// Replace this with your actual MongoDB connection string
const dbURI = 'mongodb+srv://Bharath:admin1@web1.phrsjd9.mongodb.net/?retryWrites=true&w=majority&appName=WEB1';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    return User.deleteMany({});
  })
  .then(() => {
    console.log('All users have been deleted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
