/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-wrapper">
        {children}
        {/* <button onClick={onClose}>Close Modal</button> */}
      </div>
    </>
  );
};

export default Modal;
