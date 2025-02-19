import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thought', error: err });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.json(newThought);
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ message: 'Error updating thought', error: err });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (thought) {
      thought.reactions.push(req.body);
      await thought.save();
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error adding reaction', error: err });
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (thought) {
      thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== req.params.reactionId);
      await thought.save();
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error removing reaction', error: err });
  }
};
