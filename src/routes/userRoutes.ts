import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../controllers/userController';

const router = Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;
