import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/User.js';

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const user = await User.findById(userId).populate('thoughts').populate('friends');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const friendId = new Types.ObjectId(req.params.friendId);

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }

    if (user.friends.includes(friendId as unknown as Types.ObjectId)) {
      res.status(400).json({ message: 'Friend already added' });
      return;
    }

    user.friends.push(friendId);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err });
  }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const friendId = new Types.ObjectId(req.params.friendId);

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.friends = user.friends.filter(friend => !friend.equals(friendId));
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
};
