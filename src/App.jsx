import React, { useState, useEffect } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "Which of the following is the correct name of React.js?",
    options: ["React", "React.js", "ReactJS", "All of the above"],
    answer: "All of the above",
  },
  {
    id: 2,
    question:"What of the following is used in React.js to increase performance?",
    options: ["Original DOM", "Virtual DOM", "Both A and B", "None of the above",],
    answer: "Virtual DOM",
  },
  {
    id: 3,
    question:"Which of the following acts as the input of a class-based component?",
    options: ["Class", "Factory", "Render", "Props"],
    answer: "Props",
  },
  {
    id: 4,
    question:"Which of the following keyword is used to create a class inheritance?",
    options: ["Create", "Inherits", "Extends", "This"],
    answer: "Extends",
  },
  {
    id: 5,
    question: " Does React.js create a VIRTUAL DOM in the memory?",
    options: ["TRUE", "FALSE", "Can be true or false", "Cannot say"],
    answer: "TRUE",
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        handleNext();
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, currentQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsAnswerSubmitted(true);
    setIsCorrect(option === questions[currentQuestion].answer);
  };

  const handleNext = () => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setTimer(15);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      {currentQuestion < questions.length ? (
        <div>
          <div className="question">
            <p>{questions[currentQuestion].question}</p>
          </div>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option ${
                  selectedOption === option
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                } ${
                  isAnswerSubmitted &&
                  option === questions[currentQuestion].answer
                    ? "correct"
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswerSubmitted}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="timer">{timer}</div>
          <button
            className="next-button"
            onClick={handleNext}
            disabled={!isAnswerSubmitted}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="result">
          <p>
            Your Score: {score}/{questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
