import { Request, Response } from "express";

import { UserQuestion } from "../models/userQuestion";

export async function getAllUserQuestions(req: Request, res: Response) {
    try {
        const userQuestions = await UserQuestion.find();
        res.json(userQuestions);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export async function createUserQuestion(req: Request, res: Response) {
    try {
        const newUserQuestion = new UserQuestion(req.body);
        const saved = await newUserQuestion.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}