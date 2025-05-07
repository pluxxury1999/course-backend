import { Request, Response } from "express";
import { Item } from "../models/item";

export async function getAllItems(req: Request, res: Response) {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export async function createItem(req: Request, res: Response) {
    try {
        const newItem = new Item(req.body);
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}