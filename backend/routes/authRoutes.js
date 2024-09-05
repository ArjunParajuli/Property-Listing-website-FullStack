import express from 'express';
import { registerController, loginController, updateUserController, getCurrentUser, logout } from '../controllers/authController.js';
import authenticateUser from '../middlewares/authenticateUser.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.patch("/update-user", upload.single('avatar'), authenticateUser, updateUserController);
router.get('/getCurrentUser', authenticateUser, getCurrentUser);
router.get('/logout', logout);

export default router;