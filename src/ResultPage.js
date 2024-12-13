import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ocrResults = location.state?.ocrResults || [];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>OCR Results</h1>
      <div style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
        {ocrResults.length > 0 ? (
          ocrResults.map((result, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h3>Result for: {result.filename}</h3>
              <p>{result.text}</p>
            </div>
          ))
        ) : (
          <p>No OCR results to display.</p>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Upload More Images
      </button>
    </div>
  );
}

export default ResultPage;
