import express from "express";
import faqRouter from "./routes/faq";
import itemsRouter from "./routes/item";
import userQuestionsRouter from "./routes/userQuestions";

const app = express();
app.use(express.json());
app.use("/items", itemsRouter);
app.use("/faq", faqRouter);
app.use("/userQuestions", userQuestionsRouter);

export default app;