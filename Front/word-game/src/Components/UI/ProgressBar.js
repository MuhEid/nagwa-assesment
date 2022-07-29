import React from 'react';

export default function ProgressBar(props) {
  return (
    <div>
      <meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value={props.value}>
        at 50/100
      </meter>
    </div>
  );
}
