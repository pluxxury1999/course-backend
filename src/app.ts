import cors from "cors";
import express from "express";
import faqRouter from "./routes/faq";
import itemsRouter from "./routes/item";
import userQuestionsRouter from "./routes/userQuestions";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());
app.use("/api/items", itemsRouter);
app.use("/api/faq", faqRouter);
app.use("/api/userQuestions", userQuestionsRouter);

export default app;