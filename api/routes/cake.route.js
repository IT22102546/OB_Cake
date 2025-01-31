import express from "express";
import {
  getCakes,
  getCakesByCategory,
  getCakesByShop,
} from "../controllers/cake.controller.js";

const router = express.Router();

router.get("/getcakes", getCakes);
router.get("/category", getCakesByCategory);
router.get("/getCakesByShop/:userId", getCakesByShop);

export default router;
