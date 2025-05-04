// src/index.ts

// Підключаємо Express через require
const express = require("express");

// Для типізації Request та Response можна імпортувати тільки типи

import type { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для розбору JSON-тіла запитів
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express + TypeScript (CommonJS)111!");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});