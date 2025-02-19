import { Router } from 'express';
import { 
  getThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought, 
  addReaction, 
  removeReaction 
} from '../controllers/thoughtController';

const router = Router();

router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId') // ✅ FIX: Separate delete route
  .delete(removeReaction);

export default router;
