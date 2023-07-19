import express from 'express';
import { Login, logOut, Auth } from '../controllers/Auth.js';

const router = express.Router();

router.get('/me', Auth);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;