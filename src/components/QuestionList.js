import React from "react";
import QuestionItem from "./QuestionItem.js";

function QuestionList({ questionsList, deleteExistingQuestion, updatePreviousCorrect }) {
  const listArray = questionsList.map((question, index) => {
    
    return (
      <QuestionItem
        key={index}
        question={question}
        deleteExistingQuestion={deleteExistingQuestion}
        updatePreviousCorrect={updatePreviousCorrect}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{listArray}</ul>
    </section>
  );
}

export default QuestionList;
