export default function Button(props) {
  const checkType = () => {
    props.enteredAnwser(props.content);
    // console.log(props.content);
  };

  return (
    <button className="bg-red-200 mx-10 w-20 rounded-lg" onClick={checkType}>
      {props.content}
    </button>
  );
}
