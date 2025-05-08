import cors from "cors";
import express from "express";
import faqRouter from "./routes/faq";
import itemsRouter from "./routes/item";
import userQuestionsRouter from "./routes/userQuestions";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());
app.use("/items", itemsRouter);
app.use("/faq", faqRouter);
app.use("/userQuestions", userQuestionsRouter);

export default app;