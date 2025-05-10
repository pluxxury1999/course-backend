import {
    createUserQuestion,
    getAllUserQuestions,
    updateUserQuestion
} from "../controllers/userQuestionController";

import { Router } from "express";

const router = Router();

router.get("/", getAllUserQuestions);
router.post("/", createUserQuestion);
router.patch("/:id", updateUserQuestion); // <-- тут

export default router;