import express from "express"

import {
    getRole,
    createRole,
    updateRole
} from "../controllers/Role.js"

const router = express.Router();

router.get('/role', getRole);
router.post('/role', createRole);
router.patch('/role/:id', updateRole);

export default router;