// components/MarqueeControls.jsx
import React from "react";

function MarqueeControls({ speed, setSpeed, forceStop, setForceStop, onReset,disabled=true }) {
  return (
    <div style={{ textAlign: "center", color: "var(--Black)" }}>
      <label>سرعة العرض: {speed}</label>
      <input
        type="range"
        min="10"
        max="1500"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
        style={{ width: "80%", margin: "10px 0" }}
      />
      <br />
      {!disabled && (
      <button className="btn btn-dark mt-3 upload-button" onClick={onReset}>
        إعادة
      </button>
    )}
      <br />
      <button className="btn btn-danger mt-3" onClick={() => setForceStop(!forceStop)}>
        توقف
      </button>
    </div>
  );
}

export default MarqueeControls;
