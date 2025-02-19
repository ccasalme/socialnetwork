import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Thought } from './models'; 

dotenv.config(); // Load .env variables

const MONGO_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;

// Dummy Users
const users = [
  {
    username: 'bestie',
    email: 'bestie@email.com',
  },
  {
    username: 'typescript_hater',
    email: 'typescript_hater@email.com',
  }
];

// Dummy Thoughts
const thoughts = [
  {
    thoughtText: "OMG why is TypeScript screaming?",
    username: "bestie",
    reactions: []
  },
  {
    thoughtText: "I have no thoughts, only bugs.",
    username: "typescript_hater",
    reactions: []
  }
];

const seedDatabase = async () => {
    try {
      await User.deleteMany({});
      await Thought.deleteMany({});
  
      const createdUsers = await User.insertMany(users);
      console.log('👤 Created Users:', createdUsers);
  
      const createdThoughts = await Thought.insertMany(thoughts);
      console.log('💭 Created Thoughts:', createdThoughts); // LOG THIS
  
      console.log('✅ Seed data inserted successfully!');
      process.exit();
    } catch (err) {
      console.error('🔥 Error seeding database:', err);
      process.exit(1);
    }
  };
  

db.once('open', async () => {
  console.log('🌱 Seeding database...');
  await seedDatabase();
});
