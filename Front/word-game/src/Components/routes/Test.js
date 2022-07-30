import React, { useEffect, useState, useDebugValue } from 'react';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const buttons = ['noun', 'verb', 'adverb', 'adjective'];
let initial = true;

export default function Test(answer) {
  const useStateWithLabel = (initialValue, label) => {
    const [value, setValue] = useState(initialValue);
    useDebugValue(`${label}`);
    return [value, setValue];
  };

  const [questions, setQuestions] = useStateWithLabel([], 'Questions');
  const [questionNumber, setQuestionNumber] = useStateWithLabel(1, 'Question Number');
  const [selectedPos, setSelectedPos] = useStateWithLabel('', 'selectedPos');
  const [score, setScore] = useStateWithLabel(0, 'Score');
  const [disabled, setDisabled] = useStateWithLabel(false, 'isDisabled');
  const [isFinished, setIsFinished] = useStateWithLabel(false, 'isFinished');

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
    if (questionNumber === questions.length + 1) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [questionNumber, questions]);

  useEffect(() => {
    if (!initial && disabled) {
      console.log(questions[questionNumber]);
      if (questions[questionNumber - 1]?.pos === selectedPos) {
        console.log('horaaaa');
        setScore((score) => ++score);
      }
    }
    initial = false;
  }, [selectedPos, disabled]);

  console.log(score);

  useEffect(() => {}, [isFinished]);

  const handlePosClick = (e) => {
    setSelectedPos(e.target.textContent);
    setDisabled(true);
  };

  const handleGoToNext = () => {
    setQuestionNumber((questionNumber) => questionNumber + 1);
    setSelectedPos('');
    setDisabled(false);
  };

  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/');
  };

  const handleSubmitAnwser = async () => {
    const url = 'http://localhost:3000/rank';
    // await axios.post(url, score);
    console.log(score);
    fetch(url, {
      method: 'post',
      body: {
        score: 10,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return !isFinished ? (
    <div className="flex flex-col justify-center">
      <p className="self-center font-bold text-5xl mb-10">
        {questions[questionNumber - 1] ? questions[questionNumber - 1].word : ''}
      </p>

      <div className="flex justify-center">
        {questionNumber != null
          ? buttons.map((btn, index) => {
              return (
                <Button key={index} content={btn} disabled={disabled} onClick={handlePosClick} />
              );
            })
          : null}
      </div>
      <button onClick={handleGoToNext} className="mt-20" disabled={isFinished}>
        Next
      </button>
      <ProgressBar value={(questionNumber - 1) * 10} />
    </div>
  ) : (
    <div>
      <h2>your score is {(score / 10) * 100}</h2>

      <Button content="Submit" onClick={handleSubmitAnwser} />

      <Button content="Try again" onClick={handleTryAgain} />
    </div>
  );
}
