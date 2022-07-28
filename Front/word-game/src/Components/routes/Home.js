import React from 'react';
import Button from '../UI/Button';
import Intro from '../UI/Intro';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <Intro />
      <button className="bg-red-200 mx-10 w-20 rounded-lg" onClick={handleStartTest}>
        Start
      </button>
    </div>
  );
}
