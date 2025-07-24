import express from 'express';

import secureRoute from '../middleware/secureRoute.js';
import { allUsers, login, logout, signup } from '../controllers/userController.js';
const router = express.Router();

router.post("/signup", signup);
router.post('/login', login)
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers)

export default router;