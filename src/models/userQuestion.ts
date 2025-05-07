import { Document, Schema, model } from "mongoose";

export interface IUserQuestion extends Document {
    name: string;
    email: string;
    question: string;
    answer: string;
}

const userQuestionSchema = new Schema<IUserQuestion>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

export const UserQuestion = model<IUserQuestion>("UserQuestion", userQuestionSchema);