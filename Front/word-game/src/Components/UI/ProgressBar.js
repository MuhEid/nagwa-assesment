import React from 'react';

export default function ProgressBar(props) {
  return (
    <div className="items-center mt-5 flex flex-col">
      <meter id="fuel" min="0" max="100" value={props.value} className="md:w-full w-4/5"></meter>
      <p className="text-xl">{props.value}%</p>
    </div>
  );
}
