import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {  getSweets, getSweetsByCategory } from '../controllers/sweet.controller.js';

const router = express.Router();


router.get('/getsweets',getSweets);
router.get('/category', getSweetsByCategory);

export default router;