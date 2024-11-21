import  { useState,useEffect } from 'react';
import Quiz_result from './QuizResult';
import { quiz_data } from '../data/Quizdata';
import { QuizTypes } from '../types/QuizTypes';


function Quiz() {
  // const [QuizData] = useState<QuizTypes[]>(quiz_data);
  const [QuizData, setQuizData] = useState<QuizTypes[]>([]);
  const [currentque, setcurrentque] = useState<number>(0);
  const [score, setscore] = useState<number>(0);
  const [clickedoption, setclickedoption] = useState<null | number>(null);
  const [showresult, setshowresult] = useState<boolean>(false);


  const changequestion = () => {
    if(clickedoption === null){
        alert('Plase Select the one option');
    }else{
        updatescore();
    if (currentque < QuizData.length - 1) {
      setcurrentque(currentque + 1);
      setclickedoption(null);
    } else {
      setshowresult(true);
    }
    }
  }

  const updatescore = () => {
    if (clickedoption === QuizData[currentque].answer) {
      setscore(score + 1);
    }
  }

const reset= ()=> {
  setshowresult(false);
  setcurrentque(0);
  setclickedoption(null);
  setscore(0);
}

const getRandomQuestions = (data: QuizTypes[], count: number) => {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

useEffect(() => {
  // Select 20 random questions when the component mounts
  const randomQuestions = getRandomQuestions(quiz_data, 20);
  setQuizData(randomQuestions);
}, []);

  return (
    <div className="container">

      <div className="head">
        <h2>Quiz App</h2>
      </div>
      <div className="box">
        {showresult ? (
          <Quiz_result score={score} total_score={QuizData.length} tryAgain={reset} />
        ) : QuizData.length > 0 && (
          <>
            <div className="question">
              <span>{currentque + 1}. </span>
              <span> {QuizData[currentque]?.question}</span>
            </div>
            <div className="option">
              {QuizData[currentque]?.options?.map((option, i) => {
                return (
                    <button
                      // classNameName='bt' 
                      key={option}
                      className={`bt ${clickedoption == i + 1 ? "checked" : null}`}
                      onClick={() => setclickedoption(i + 1)}
                    > {option}
                    </button>
                    // <br />
                )
              })}
            </div>
            <div className="btn">
              <button onClick={changequestion}>Next</button>
            </div>
            <div className="progress">
              <p className="progress-text">
                {currentque + 1} out of {QuizData.length}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Quiz
