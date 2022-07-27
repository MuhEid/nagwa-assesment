import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button(props) {
  // const navigate = useNavigate();

  const checkType = () => {
    props.test(props.content);
    console.log(props.content);
  };

  return (
    <button className="bg-red-200 mx-10 w-20 rounded-lg" onClick={checkType}>
      {props.content}
    </button>
  );
}
