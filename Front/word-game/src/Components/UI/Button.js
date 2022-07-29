import { useState } from 'react';
export default function Button(props) {
  // const [disabled, setDisabled] = useState(false);

  const checkType = () => {
    props.enteredAnwser(props.content);
    // setDisabled(true);

    // console.log(props.content);
  };

  return (
    <button
      className="bg-red-200 mx-10 w-20 rounded-lg"
      onClick={checkType}
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
}
