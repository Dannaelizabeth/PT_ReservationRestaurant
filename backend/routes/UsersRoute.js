import express from "express"

import {
    getUsers,
    createUsers,
    updateUsers
} from "../controllers/Users.js"
import { verificationUser, onlyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',verificationUser,onlyAdmin, getUsers);
router.post('/users', createUsers);
router.patch('/users/:id', updateUsers);

export default router;