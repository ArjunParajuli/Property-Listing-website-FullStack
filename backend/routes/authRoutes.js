import express from 'express';
import { registerController, loginController, updateUserController } from '../controllers/authController.js';
import authenticateUser from '../middlewares/authenticateUser.js';

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.patch("/update-user", authenticateUser, updateUserController);

export default router;