// src/routes/userQuestions.ts

import {
    createUserQuestion,
    getAllUserQuestions,
    updateUserQuestion,
} from "../controllers/userQuestionController";

import { Router } from "express";

const router = Router();

router.get("/", getAllUserQuestions);
router.post("/", createUserQuestion);
// Ось цей рядок
router.patch("/:id", updateUserQuestion);

export default router;