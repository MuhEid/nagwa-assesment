import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';
import axios from 'axios';

const buttons = ['noun', 'verb', 'adverb', 'adjective'];
let intial = true;

export default function Test(anwser) {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(null);
  const [selectedPos, setSelectedPos] = useState();
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const url = 'http://localhost:3000/words';
    const fetchData = async () => {
      const response = await axios.get(url);
      const json = response.data;
      setQuestions(json);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!intial) {
      console.log(questions[questionNumber].pos, selectedPos);

      if (questions[questionNumber].pos === selectedPos) {
        setScore((score) => ++score);
      } else {
      }
      setSelectedPos('');
      setDisabled(false);
    }
    intial = false;
  }, [selectedPos, questionNumber]);

  // mmake sure nothing updates the state other than handleGoToNext
  const handleGoToNext = () => {
    setQuestionNumber((questionNumber) => (questionNumber != null ? questionNumber + 1 : 0));
  };

  const onSubmit = (anwser) => {
    setSelectedPos(anwser);
    setDisabled(true);
  };

  return (
    <div className="flex flex-col justify-center">
      {/* {console.log(questions, questionNumber)} */}
      <p>{questions[questionNumber] ? questions[questionNumber].word : ''}</p>

      <div className="flex justify-center">
        {questionNumber != null
          ? buttons.map((btn) => {
              return <Button content={btn} enteredAnwser={onSubmit} disabled={disabled} />;
            })
          : null}
      </div>
      <button onClick={handleGoToNext} className="mt-20">
        Next
      </button>
      <ProgressBar value={questionNumber ? (questionNumber + 1) * 10 : 0} />
    </div>
  );
}
