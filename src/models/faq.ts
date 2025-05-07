import { Document, Schema, model } from "mongoose";

export interface IFaq extends Document {
    question: string;
    answer: string;
}

const faqSchema = new Schema<IFaq>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    { collection: "faq" }
);

export const Faq = model<IFaq>("Faq", faqSchema);