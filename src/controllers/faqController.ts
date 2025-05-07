import { Request, Response } from "express";

import { Faq } from "../models/faq";

export async function getAllFaqs(req: Request, res: Response) {
    try {
        const faqs = await Faq.find();
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export async function createFaq(req: Request, res: Response) {
    try {
        const newFaq = new Faq(req.body);
        const saved = await newFaq.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}