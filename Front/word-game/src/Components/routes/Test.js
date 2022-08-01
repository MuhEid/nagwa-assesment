import React, { useEffect, useState, useDebugValue } from 'react';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const buttons = ['noun', 'verb', 'adverb', 'adjective'];
let initial = true;

export default function Test(answer) {
  // Create a custom hook to log the state with a label for easier debugging

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
  const [rank, setRank] = useStateWithLabel(null, 'Rank');
  const [correct, setCorrect] = useStateWithLabel(null, 'Correct flag');

  // fetching data from words endpoint
  useEffect(() => {
    const url = 'http://localhost:3000/words';
    const fetchData = async () => {
      const response = await axios.get(url);
      const json = response.data;
      setQuestions(json);
    };

    fetchData();
  }, []);

  // check if test is finished or not
  useEffect(() => {
    if (questionNumber === questions.length + 1) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [questionNumber, questions]);

  // updating the score if answer is correct
  // updating the correct state to render correct or incorrect to user
  useEffect(() => {
    if (!initial && disabled) {
      if (questions[questionNumber - 1]?.pos === selectedPos) {
        setScore((score) => ++score);
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
    initial = false;
  }, [selectedPos, disabled]);

  useEffect(() => {}, [isFinished]);

  // once the user chooses an answer .. all buttons will be disabled
  const handlePosClick = (e) => {
    setSelectedPos(e.target.textContent);
    setDisabled(true);
  };

  const handleGoToNext = () => {
    setQuestionNumber((questionNumber) => questionNumber + 1);
    setSelectedPos('');
    setDisabled(false);
    setCorrect(null);
  };

  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/');
  };

  // sending the score to the rank endpoint to calculate the rank
  useEffect(() => {
    const handleSubmitAnwser = async () => {
      const url = 'http://localhost:3000/rank';
      try {
        let rank = await axios({
          method: 'post',
          header: "'Access-Control-Allow-Origin', '*'",
          url: url,
          data: {
            score: score,
          },
        });
        setRank(rank.data.rank);
      } catch (e) {
        console.log(e);
      }
    };

    handleSubmitAnwser();
  }, [isFinished]);

  console.log(questions[questionNumber - 1]);

  return !isFinished ? (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center w-4/5 h-4/5 lg:w-1/2 lg:h-3/5 bg-[#f5f4ea] rounded-3xl shadow-2xl">
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full lg:p-24">
        <p className="self-center font-bold text-5xl mb-10">
          {questions[questionNumber - 1] ? questions[questionNumber - 1].word : ''}
        </p>

        <div className="flex flex-col items-center">
          <p>listen?</p>
          {questions[questionNumber - 1] ? (
            <audio
              src={require(`../../assets/${questions[questionNumber - 1].id}.mp3`)}
              controls
            ></audio>
          ) : (
            ''
          )}
        </div>

        <div className="flex justify-center items-center w-full my-10 flex-col lg:flex-row">
          {questionNumber != null
            ? buttons.map((btn, index) => {
                return (
                  <Button key={index} content={btn} disabled={disabled} onClick={handlePosClick} />
                );
              })
            : null}
        </div>
        <div className="h-10">
          {correct == null ? (
            ''
          ) : correct ? (
            <p className="text-xl text-green-600 bg-green-100 h-full">correct</p>
          ) : (
            <p className="text-xl text-red-500 bg-red-200 h-full">incorrect</p>
          )}
        </div>

        <Button onClick={handleGoToNext} className="mt-5" disabled={isFinished} content="Next">
          Next
        </Button>
        <ProgressBar value={(questionNumber - 1) * 10} className="self-center" />
      </div>
    </div>
  ) : (
    <div className="p-20 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center w-1/2 h-1/2 bg-[#f5f4ea] rounded-3xl shadow-2xl">
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <h1 className="text-5xl mb-10">Thank you for Taking our test</h1>
        <h2 className="text-2xl mb-10">your rank is {rank}</h2>
        <p>{rank < 30 ? '):' : ''}</p>
        <Button content="Try again" onClick={handleTryAgain} />
      </div>
    </div>
  );
}
