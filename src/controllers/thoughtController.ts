import { Request, Response } from 'express';
import { Types } from 'mongoose';
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
export const getThoughtById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const thoughtId = new Types.ObjectId(req.params.id); // ✅ Convert to ObjectId
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
      return res.json(thought);
    } catch (err) {
      return res.status(500).json({ message: 'Error retrieving thought', error: err });
    }
  };

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { thoughtText, username, userId } = req.body;
  
      if (!thoughtText || !username || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const userObjectId = new Types.ObjectId(userId); // ✅ Convert userId to ObjectId
  
      const newThought = new Thought({ thoughtText, username });
      await newThought.save(); // ✅ Explicitly save before updating user
  
      const user = await User.findByIdAndUpdate(
        userObjectId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json(newThought);
    } catch (err) {
      return res.status(500).json({ message: 'Error creating thought', error: err });
    }
  };

// Update a thought
export const updateThought = async (req: Request, res: Response): Promise<Response> => {
    try {
      const thoughtId = new Types.ObjectId(req.params.id);
      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
  
      if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json({ message: 'Error updating thought', error: err });
    }
  };

// Delete a thought
export const deleteThought = async (req: Request, res: Response): Promise<Response> => {
    try {
      const thoughtId = new Types.ObjectId(req.params.id);
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);
  
      if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });
      return res.json({ message: 'Thought deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting thought', error: err });
    }
  };

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<Response> => {
    try {
      const thoughtId = new Types.ObjectId(req.params.thoughtId);
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      thought.reactions.push(req.body as any); // ✅ TypeScript-friendly fix
      await thought.save();
  
      return res.json(thought);
    } catch (err) {
      return res.status(500).json({ message: 'Error adding reaction', error: err });
    }
  };
  

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<Response> => {
    try {
      const thoughtId = new Types.ObjectId(req.params.thoughtId);
      const reactionId = new Types.ObjectId(req.params.reactionId);
  
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      const reaction = thought.reactions.id(reactionId); // ✅ Use `.id()` to find subdocument
      if (!reaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
  
      reaction.deleteOne(); // ✅ Properly removes the reaction
      await thought.save();
  
      return res.json(thought);
    } catch (err) {
      return res.status(500).json({ message: 'Error removing reaction', error: err });
    }
  };
  
  
  
