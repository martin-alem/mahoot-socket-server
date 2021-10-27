import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: false,
    default: "",
  },
  answers: {
    type: [
      {
        answer: { type: String, required: true },
        correct: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
  questionType: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
  quizId: {
    type: mongoose.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
