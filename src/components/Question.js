import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    const questionTimer = setTimeout(()=>{
      //console.log("running "+timeRemaining);
      if(timeRemaining>1){ 
        setTimeRemaining(timeRemaining-1);
      } else {
        //console.log(timeRemaining)
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    return function cleanup() {
      clearTimeout(questionTimer);
    }
  })

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
