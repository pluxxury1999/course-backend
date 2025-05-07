import { createFaq, getAllFaqs } from "../controllers/faqController";

import { Router } from "express";

const router = Router();
router.get("/", getAllFaqs);
router.post("/", createFaq);

export default router;