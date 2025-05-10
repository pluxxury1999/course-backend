// src/controllers/userQuestionController.ts

import { RequestHandler } from "express";
import { UserQuestion } from "../models/userQuestion"; // ваша Mongoose-модель
import nodemailer from "nodemailer";

// Налаштування SMTP-транспорту через змінні оточення
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true", // true для 465, false для 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

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

    // Має бути хоча б одне поле для оновлення
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

        // Якщо адміністратор додав/оновив відповідь — шлемо листа
        if (typeof answer === "string" && answer.trim() !== "") {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM, // наприклад: '"Support" <support@example.com>'
                to: updated.email,
                subject: "Відповідь на ваше питання",
                text: `
Привіт, ${updated.name}!

Ви задали питання:
${updated.question}

Наша відповідь:
${answer}

Дякуємо, що звернулися до нас!
        `,
                html: `
          <p>Привіт, <strong>${updated.name}</strong>!</p>
          <p><em>Ваше питання:</em><br/>${updated.question}</p>
          <hr/>
          <p><em>Наша відповідь:</em><br/>${answer}</p>
          <p>Дякуємо, що звернулися до нас! Довідкове бюро авіакаси 2025</p>
        `,
            });
        }

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
};
