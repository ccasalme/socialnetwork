import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = new Types.ObjectId(req.params.id); // ✅ Convert to ObjectId
    const user = await User.findById(userId).populate('thoughts').populate('friends');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving user', error: err });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = new Types.ObjectId(req.params.id); // ✅ Convert to ObjectId
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: 'Error updating user', error: err });
    }
  };

  export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = new Types.ObjectId(req.params.id); // ✅ Convert to ObjectId
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'User deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting user', error: err });
    }
  };

  export const addFriend = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = new Types.ObjectId(req.params.id);
      const friendId = new Types.ObjectId(req.params.friendId);
  
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
  
      // Prevent duplicate friend entries
      if (user.friends.includes(friendId as unknown as Types.ObjectId)) {
        return res.status(400).json({ message: 'Friend already added' });
      }
  
      user.friends.push(friendId); // ✅ TypeScript is happy now
      await user.save();
  
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Error adding friend', error: err });
    }
  };
  

  export const removeFriend = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = new Types.ObjectId(req.params.id);
      const friendId = new Types.ObjectId(req.params.friendId);
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.friends = user.friends.filter(friend => !friend.equals(friendId)); // ✅ `.equals()` fixes ObjectId issue
      await user.save();
  
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Error removing friend', error: err });
    }
  };
  
  
