import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => {
  return (
    <Modal
      isOpen={!!props.selectedOption}
      onRequestClose={props.handleClearSelectedOption}
      contentLabel="Selected Option"
      // delay to remove element
      closeTimeoutMS={200}
      // setting up a class name to customize styling instead of using default styles
      className="modal"
    >
      <h3 className="modal__title">Selected Option</h3>
      {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
      <button
        className="button"
        onClick={props.handleClearSelectedOption}
      >
        Okay
      </button>
    </Modal>
  )
};

export default OptionModal 