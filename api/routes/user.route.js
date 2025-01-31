import express  from "express";
import { deleteUser, findUserByClerkId,  updateUser } from "../controllers/user.controller.js";


const router = express.Router();



router.put('/updateUser/:id', updateUser);
router.get('/findByClerkId/:clerkUserId', findUserByClerkId);
router.delete('/delete/:id', deleteUser);


export default router;