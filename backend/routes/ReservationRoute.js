import express from "express"

import {
    getReservation,
    createReservation,
    updateReservation
} from "../controllers/Reservation.js"

const router = express.Router();

router.get('/reservation', getReservation);
router.post('/reservation/:userId', createReservation);
router.patch('/reservation/:id', updateReservation);

export default router;