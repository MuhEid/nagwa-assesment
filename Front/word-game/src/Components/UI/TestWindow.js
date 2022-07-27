import React, { useState } from 'react';
import data from '../../TestData.json';

const types = ['noun', 'verb', 'adverb', 'adjective'];

export default function TestWindow(props) {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const randomIndex = randomIntFromInterval(0, 9);
  // console.log(randomIndex);

  function shuffleArray(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  function getTypeArray(type) {
    let posArray = data.wordList.filter((el) => el.pos === type);
    return posArray;
  }

  let totalArray = [];

  types.forEach((type) => {
    let t = getTypeArray(type);
    let shuffledArrays = shuffleArray(t, t.length);
    totalArray.push(shuffledArrays);
  });

  function getQuestions() {
    let results = [];
    while (results.length < 10) {
      let randomIndex = randomIntFromInterval(0, 3);
      if (totalArray[randomIndex].length > 0) {
        let q = totalArray[randomIndex].pop();
        results.push(q);
      }
    }
    return results;
  }

  let questions = getQuestions();
  // console.log(questions);

  const [questionNumber, setQuestionNumber] = useState(0);

  const handleAnswer = () => {
    setQuestionNumber((questionNumber) => ++questionNumber);
    console.log(questions[questionNumber].pos, props.anwser);

    // if (questions[questionNumber].pos === props.anwser)
    // else console.log('wrong');
  };

  return (
    <div className="flex justify-center flex-col">
      <h3>Please choose the correct answer</h3>
      {questions[questionNumber].word}
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
}
