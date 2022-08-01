import React from 'react';
import Button from '../UI/Button';

import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };
  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center w-1/2 h-1/2 bg-[#f5f4ea] rounded-3xl shadow-2xl">
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
        <h2 className="text-3xl my-10">Welcome to the words Test</h2>
        <h2 className="text-3xl my-10">there are 10 questions</h2>

        <h2 className="text-lg my-5">start the test when your are ready</h2>

        <Button onClick={handleStartTest} content="start" className="py-2 w-3/12" />
      </div>
    </div>
  );
}
