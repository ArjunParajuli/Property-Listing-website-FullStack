import express from 'express';
import { registerController, loginController, updateUserController, getCurrentUser, logout } from '../controllers/authController.js';
import authenticateUser from '../middlewares/authenticateUser.js';

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.patch("/update-user", authenticateUser, updateUserController);
router.get('/getCurrentUser', authenticateUser, getCurrentUser);
router.get('/logout', logout);

export default router;