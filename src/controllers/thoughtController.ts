import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Thought from '../models/Thought';
import User from '../models/User';

// Get all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => { // ✅ Fix: Return type is Promise<void>
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughtId = new Types.ObjectId(req.params.id);
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thought', error: err });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const userObjectId = new Types.ObjectId(userId);
    const newThought = await Thought.create({ thoughtText, username });

    const user = await User.findByIdAndUpdate(
      userObjectId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(newThought);
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err });
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughtId = new Types.ObjectId(req.params.id);
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });

    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ message: 'Error updating thought', error: err });
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughtId = new Types.ObjectId(req.params.id);
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deletedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughtId = new Types.ObjectId(req.params.thoughtId);
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    thought.reactions.push(req.body as any);
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error adding reaction', error: err });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const thoughtId = new Types.ObjectId(req.params.thoughtId);
      const reactionId = new Types.ObjectId(req.params.reactionId);
  
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
  
      // ✅ FIX: Use `id()` method to find the reaction
      const reaction = thought.reactions.id(reactionId);
      
      if (!reaction) {
        res.status(404).json({ message: 'Reaction not found' });
        return;
      }
  
      reaction.deleteOne(); // ✅ FIX: Properly delete the reaction
      await thought.save();
  
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error removing reaction', error: err });
    }
  };
  
  
  
  
