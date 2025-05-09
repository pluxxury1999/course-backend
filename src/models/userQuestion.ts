import { Document, Schema, model } from "mongoose";

export interface IUserQuestion extends Document {
    name: string;
    email: string;
    question: string;
    answer: string;
    isPublished: boolean;
}

const userQuestionSchema = new Schema<IUserQuestion>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: false, default: "" },
        isPublished: { type: Boolean, required: true, default: false },
    },
    { collection: "user-questions" }
);

export const UserQuestion = model<IUserQuestion>("UserQuestion", userQuestionSchema);
