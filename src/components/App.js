import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const baseURL = "http://localhost:4000/questions"

function App() {
  const [page, setPage] = useState("List");
  const [questionsList, setQuestionsList] = useState([]);

  // GET /questions
  useEffect(() => {
    fetch(baseURL)
    .then(response => response.json())
    .then(data => setQuestionsList(data));
  }, []);

  // export QuestionForm.js for adding a new question
  function addNewQuestion(newQuestion) {
    setQuestionsList([...questionsList, newQuestion]);
  }

  // export tp QuestionForm.js for deleting an existing question
  function deleteExistingQuestion(questionToDelete) {
    setQuestionsList(
      questionsList.filter(
        singleQuestion => singleQuestion.id !== questionToDelete.id
      )
    );
  }

  // update the correct answer of an existing question
  function updatePreviousCorrect(questionToUpdate) {
    setQuestionsList(
      questionsList.map(
        singleQuestion => {
          if (singleQuestion.id === questionToUpdate.id) {
            return questionToUpdate;
          } else {
            return singleQuestion;
          }
        }
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm 
      addNewQuestion={addNewQuestion} /> : 
      <QuestionList questionsList={questionsList} 
      deleteExistingQuestion={deleteExistingQuestion} 
      updatePreviousCorrect={updatePreviousCorrect}
      />
      }
    </main>
  );
}

export default App;
