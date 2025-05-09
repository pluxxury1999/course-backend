// src/controllers/userQuestionController.ts

import { RequestHandler } from "express";
import { UserQuestion } from "../models/userQuestion"; // ваша Mongoose-модель

// GET /api/userQuestions
export const getAllUserQuestions: RequestHandler = async (req, res) => {
    try {
        const qs = await UserQuestion.find();
        res.json(qs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};

// POST /api/userQuestions
export const createUserQuestion: RequestHandler = async (req, res) => {
    try {
        // в тілі вже лежить { name, email, question, answer, isPublished? }
        const newQ = new UserQuestion(req.body);
        const saved = await newQ.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Invalid data." });
    }
};

// PATCH /api/userQuestions/:id
export const updateUserQuestion: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { answer, isPublished } = req.body;

    // Має бути хоча б одне поле
    if (answer === undefined && isPublished === undefined) {
        res.status(400).json({ message: "Nothing to update." });
        return;
    }

    // Збираємо тільки ті дані, які прийшли
    const updateData: any = {};
    if (typeof answer === "string") {
        updateData.answer = answer;
    }
    if (typeof isPublished === "boolean") {
        updateData.isPublished = isPublished;
    }

    try {
        const updated = await UserQuestion.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updated) {
            res.status(404).json({ message: "Not found." });
            return;
        }
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};