import React from "react";
import "./Popup.css"; // Create a new CSS file for the pop-up

function Popup({ text_ar, onClose }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Check the Arabic Text</h2>
        <p>{text_ar}</p>
        <button onClick={onClose}>Confirm and Proceed</button>
      </div>
    </div>
  );
}

export default Popup;
