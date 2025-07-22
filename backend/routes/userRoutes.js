import express from 'express';
import { getUserProfile, loginUser,registerUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.route('/profile').get(protect, getUserProfile);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);

export default userRoutes;
