import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ onClose, children, isOpen }) => {
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${!isOpen ? 'hidden' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&#10006;</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;