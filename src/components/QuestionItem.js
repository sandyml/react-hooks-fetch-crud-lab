import React from "react";

const baseURL = "http://localhost:4000/questions";

function QuestionItem({ question, deleteExistingQuestion, updatePreviousCorrect }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const deleteQuestionHandler = () => {
    fetch(baseURL + id, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(() => deleteExistingQuestion(question))
  }

  const changeCorrectAnswerHandler = (event) => {
    fetch(baseURL + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: parseInt(event.target.value
        )
      })
    })
      .then(resp => resp.json())
      .then(data => updatePreviousCorrect(data));
  }

  return (
    <li>
      <h4>Question: {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={changeCorrectAnswerHandler}
        >
          {options}
        </select>
      </label>
      <button onClick={deleteQuestionHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
