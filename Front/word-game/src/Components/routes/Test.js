import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';
import axios from 'axios';

const buttons = ['noun', 'verb', 'adverb', 'adjective'];

export default function Test(anwser) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:3000/words';
    const fetchData = async () => {
      const response = await axios.get(url);
      const json = response.data;
      setQuestions(json);
    };

    fetchData();
  }, []);

  const [questionNumber, setQuestionNumber] = useState(0);

  const handleGoToNext = () => {
    setQuestionNumber((questionNumber) => ++questionNumber);
  };

  const [selectedPos, setSelectedPos] = useState();
  const onSubmit = (anwser) => {
    setSelectedPos(anwser);
    console.log('student entered ' + anwser);
  };

  // hnadle when submit is it correct or not

  return (
    <div className="flex flex-col justify-center">
      {console.log(questions, questionNumber)}
      <p>{questions[questionNumber] ? questions[questionNumber].word : ''}</p>

      <div className="flex justify-center">
        {buttons.map((btn) => {
          return <Button content={btn} enteredAnwser={onSubmit} />;
        })}
      </div>
      <button onClick={handleGoToNext}>Next</button>
      <ProgressBar />
    </div>
  );
}
