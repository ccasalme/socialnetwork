import express from 'express';
import db from './config/connection';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
});
