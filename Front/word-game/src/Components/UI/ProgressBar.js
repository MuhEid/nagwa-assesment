import React from 'react';

export default function ProgressBar(props) {
  return (
    <div className="text-center">
      <meter id="fuel" min="0" max="100" value={props.value} className="w-full"></meter>
      {props.value}%
    </div>
  );
}
