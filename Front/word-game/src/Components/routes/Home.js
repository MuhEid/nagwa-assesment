import React from 'react';
import Button from '../UI/Button';
import Intro from '../UI/Intro';
import { useNavigate } from 'react-router-dom';

const buttons = ['noun', 'verb', 'adverb', 'adjective'];

export default function Home() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <Intro />
      <Button content={'Start'} click={handleStartTest} />
    </div>
  );
}
