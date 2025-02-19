import express from 'express';
import db from './config/connection';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('Social Network API Running!');
});

// Start the server
db.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
