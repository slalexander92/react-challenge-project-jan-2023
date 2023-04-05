import React from "react";
import './modal.css';

const Modal = ({ isModalOpen, closeModal, children }) => {
  return (
    <div className={`modal-wrapper ${isModalOpen ? 'is-open' : ''}`}>
      <div className={`modal-overlay ${isModalOpen ? 'is-open' : ''}`}></div>

      <div className={
        `modal
        ${isModalOpen ? 'is-open' : ''}`
      }>
        <div className="button-row" onClick={closeModal}>
          <button className="close-modal-button">close</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal;
