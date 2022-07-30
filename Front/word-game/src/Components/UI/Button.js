export default function Button(props) {
  return (
    <button
      className={`bg-red-200 mx-10 w-20 rounded-lg ${props.disabled ? 'cursor-not-allowed' : ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
}
