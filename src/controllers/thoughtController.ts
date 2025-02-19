import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thought', error: err });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newThought = await Thought.create({ thoughtText, username });

    // Update user with new thought
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(newThought);
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err });
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ message: 'Error updating thought', error: err });
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      thought.reactions.push(req.body as any); // ✅ Casting to `any` fixes TypeScript complaints
      await thought.save();
  
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error adding reaction', error: err });
    }
  };
  

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      thought.reactions = thought.reactions.filter(
        (reaction: any) => reaction._id.toString() !== req.params.reactionId
      );
  
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error removing reaction', error: err });
    }
  };
  
