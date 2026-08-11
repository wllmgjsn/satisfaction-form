import { ChangeEvent, useState } from "react";
import { AuthenticatedUser } from "../../../types";

interface QuestionBoxProps {
  question: string;
  actualQuestion: number;
  handleQuestionChange: (newQuestionIndex: number) => void;
  responses: string[];
  setResponses: React.Dispatch<React.SetStateAction<string[]>>;
  authenticatedUser: AuthenticatedUser | undefined;
  handleSendFormResponse: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const QuestionBox = ({
  question,
  actualQuestion,
  handleQuestionChange,
  responses,
  setResponses,
  authenticatedUser,
  handleSendFormResponse,
}: QuestionBoxProps) => {

  const handleSaveResponse = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let updatedResponses = [...responses];
    updatedResponses[actualQuestion] = e.target.value;
    setResponses(updatedResponses);
  };

  return (
    <div>
      <p>{question}</p>
      <textarea
        style={{
          minHeight: "100px",
          minWidth: "50%",
        }}
        value={responses[actualQuestion]}
        onChange={handleSaveResponse}
      ></textarea>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          margin: "1em",
        }}
      >
        <button
          onClick={() => {
            handleQuestionChange(actualQuestion - 1);
          }}
        >
          ←
        </button>
        <button
          onClick={() => {
            handleQuestionChange(actualQuestion + 1);
          }}
        >
          →
        </button>
        {authenticatedUser && (
          <button
            onClick={async () => {
              await handleSendFormResponse();
            }}
          >
            Envoyer
          </button>
        )}
      </div>
      <p>Question {actualQuestion + 1} sur 3</p>
    </div>
  );
};

export default QuestionBox;
