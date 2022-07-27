import React, { useState } from 'react';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';
import TestWindow from '../UI/TestWindow';

const buttons = ['noun', 'verb', 'adverb', 'adjective'];

export default function Test(anwser) {
  const [selectedPos, setSelectedPos] = useState();
  const onSubmit = (anwser) => {
    // console.log('from test prop to parent ' + anwser);
    setSelectedPos(anwser);
  };
  return (
    <div className="flex flex-col justify-center">
      <TestWindow anwser={selectedPos} />
      <div className="flex justify-center">
        {buttons.map((btn) => {
          return <Button content={btn} test={onSubmit} />;
        })}
      </div>
      <ProgressBar />
    </div>
  );
}
