import express from "express";
import createPushToken from "../controllers/pushtoken.controller.js";

const router = express.Router();
router.post("/token", createPushToken);

export default router;
