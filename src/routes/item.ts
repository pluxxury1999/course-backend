import { createItem, getAllItems } from "../controllers/itemController";

import { Router } from "express";

const router = Router();
router.get("/", getAllItems);
router.post("/", createItem);

export default router;