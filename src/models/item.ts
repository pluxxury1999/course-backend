import { Document, Schema, model } from "mongoose";

export interface IItem extends Document {
    name: string;
    value: number;
}

const itemSchema = new Schema<IItem>({
    name: { type: String, required: true },
    value: { type: Number, required: true },
});

export const Item = model<IItem>("Item", itemSchema);