export default function Button(props) {
  return (
    <button
      className={`bg-green-600 text-center text-xl p-1 my-2 w-24 mx-5 rounded-lg text-white ${
        props.className
      } ${props.disabled ? 'cursor-not-allowed' : ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
}
