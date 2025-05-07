import { createUserQuestion, getAllUserQuestions } from "../controllers/userQuestionController";

import { Router } from "express";

const router = Router();
router.get("/", getAllUserQuestions);
router.post("/", createUserQuestion);

export default router;