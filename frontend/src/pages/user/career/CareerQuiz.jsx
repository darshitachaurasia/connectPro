import React, { useState } from "react";
import CareerPathAI from "./AI-Suggestions";

const questions = [
  // same 15 questions as before
  {
    question: "Which subject do you enjoy the most?",
    options: [
      { text: "Physics & Math", field: "Engineering" },
      { text: "Biology & Chemistry", field: "Medical" },
      { text: "Economics & Business", field: "Commerce" },
      { text: "History & Literature", field: "Arts" },
    ],
  },
  {
    question: "What kind of problems do you like solving?",
    options: [
      { text: "Technical or mechanical", field: "Engineering" },
      { text: "Human body and health", field: "Medical" },
      { text: "Finance & trade", field: "Commerce" },
      { text: "Social & creative", field: "Arts" },
    ],
  },
  {
    question: "Which of these careers sounds appealing?",
    options: [
      { text: "Software Developer", field: "Engineering" },
      { text: "Doctor or Nurse", field: "Medical" },
      { text: "Business Analyst", field: "Commerce" },
      { text: "Writer or Designer", field: "Arts" },
    ],
  },
  {
    question: "What's your strength?",
    options: [
      { text: "Logical thinking", field: "Engineering" },
      { text: "Empathy & observation", field: "Medical" },
      { text: "Management & numbers", field: "Commerce" },
      { text: "Creativity & expression", field: "Arts" },
    ],
  },
  {
    question: "Which activity do you prefer?",
    options: [
      { text: "Building or coding something", field: "Engineering" },
      { text: "Helping someone physically or emotionally", field: "Medical" },
      { text: "Analyzing market trends", field: "Commerce" },
      { text: "Painting, acting, or writing", field: "Arts" },
    ],
  },
  {
    question: "Which subject was your strength in school?",
    options: [
      { text: "Math", field: "Engineering" },
      { text: "Biology", field: "Medical" },
      { text: "Accounts", field: "Commerce" },
      { text: "English", field: "Arts" },
    ],
  },
  {
    question: "Which of these best describes you?",
    options: [
      { text: "Analytical and detail-oriented", field: "Engineering" },
      { text: "Compassionate and patient", field: "Medical" },
      { text: "Goal-oriented and persuasive", field: "Commerce" },
      { text: "Imaginative and expressive", field: "Arts" },
    ],
  },
  {
    question: "What would you prefer as a future work environment?",
    options: [
      { text: "Tech company or R&D lab", field: "Engineering" },
      { text: "Hospital or clinic", field: "Medical" },
      { text: "Corporate office or startup", field: "Commerce" },
      { text: "Studio or creative agency", field: "Arts" },
    ],
  },
  {
    question: "Your favorite hobby?",
    options: [
      { text: "Solving puzzles or building gadgets", field: "Engineering" },
      { text: "Volunteering or first-aid learning", field: "Medical" },
      { text: "Tracking stocks or managing money", field: "Commerce" },
      { text: "Sketching, journaling, or singing", field: "Arts" },
    ],
  },
  {
    question: "What excites you the most?",
    options: [
      { text: "Innovating or improving systems", field: "Engineering" },
      { text: "Saving lives and health research", field: "Medical" },
      { text: "Business growth and marketing", field: "Commerce" },
      { text: "Storytelling or content creation", field: "Arts" },
    ],
  },
  {
    question: "Which newspaper section do you read first?",
    options: [
      { text: "Science & Tech", field: "Engineering" },
      { text: "Health & Medicine", field: "Medical" },
      { text: "Business & Economy", field: "Commerce" },
      { text: "Culture & Art", field: "Arts" },
    ],
  },
  {
    question: "What kind of TV shows do you prefer?",
    options: [
      { text: "Science fiction or documentaries", field: "Engineering" },
      { text: "Medical dramas", field: "Medical" },
      { text: "Business reality shows", field: "Commerce" },
      { text: "Artistic or historical series", field: "Arts" },
    ],
  },
  {
    question: "What would you likely enjoy as a group project?",
    options: [
      { text: "Building a model or robot", field: "Engineering" },
      { text: "Health awareness campaign", field: "Medical" },
      { text: "Business plan for a startup", field: "Commerce" },
      { text: "Short film or magazine", field: "Arts" },
    ],
  },
  {
    question: "What do others appreciate about you?",
    options: [
      { text: "Problem-solving skills", field: "Engineering" },
      { text: "Compassion and patience", field: "Medical" },
      { text: "Persuasiveness and planning", field: "Commerce" },
      { text: "Creativity and imagination", field: "Arts" },
    ],
  },
  {
    question: "If you had a weekend to choose an activity, you'd go for:",
    options: [
      { text: "Tech event or coding hackathon", field: "Engineering" },
      { text: "Volunteering in a health camp", field: "Medical" },
      { text: "Business expo or workshop", field: "Commerce" },
      { text: "Art gallery or creative writing", field: "Arts" },
    ],
  },
];

const CareerCounsellingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    Engineering: 0,
    Medical: 0,
    Commerce: 0,
    Arts: 0,
  });
  const [result, setResult] = useState(null);

  const handleOptionClick = (field) => {
    const updatedScores = {
      ...scores,
      [field]: scores[field] + 1,
    };
    setScores(updatedScores);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const maxField = Object.keys(updatedScores).reduce((a, b) =>
        updatedScores[a] > updatedScores[b] ? a : b
      );
      setResult(maxField);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ Engineering: 0, Medical: 0, Commerce: 0, Arts: 0 });
    setResult(null);
  };

  return (
    <div className="p-8 mt-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Career Counselling Quiz
      </h2>

      {result ? (
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900">
            Your Recommended Career Path:
          </h3>
          <p className="text-xl text-blue-600 mb-6">{result}</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={resetQuiz}
          >
            Retake Quiz
          </button>
          <div className="w-full p-4">
            <CareerPathAI/>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-medium mb-4 text-blue-800">
            Q{currentQuestion + 1} of {questions.length}:{" "}
            {questions[currentQuestion].question}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.field)}
                className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-200 border border-blue-300 transition duration-200 text-left"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerCounsellingQuiz;