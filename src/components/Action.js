import React from 'react';

const Action = (props) => {
  return (
    <div>
      <button
        className="big-button"
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        Help me decide!
      </button>
    </div>
  );
};

export default Action;
