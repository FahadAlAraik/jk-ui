import React, { useState } from "react";
import ImgUpload from "./ImgUpload";
import TextUpload from "./TextUpload";
import TextUpload_JSON from "./TextUpload_json";
import Button from "react-bootstrap/Button";

function App() {
  const [showImgUpload, setShowImgUpload] = useState(true);
  const [showSelection, setShowSelection] = useState(true); // Controls visibility of selection buttons

  const handleSelection = (isImage) => {
    setShowImgUpload(isImage);
    setShowSelection(false); // Hide selection buttons after choosing
  };

  const handleRestart = () => {
    setShowSelection(true); // Show selection buttons again on restart
  };

  return (
    <div className="App">
      {showSelection ? (
        <div className="selection-buttons">
          <Button variant="info" onClick={() => handleSelection(true)}>
            صورة
          </Button>
          <Button variant="info" onClick={() => handleSelection(false)}>
            نص
          </Button>
        </div>
      ) : showImgUpload ? (
        <ImgUpload onRestart={handleRestart} /> // Pass onRestart to ImgUpload
      ) : (
        <TextUpload_JSON onRestart={handleRestart} /> // Pass onRestart to TextUpload
      )}
    </div>
  );
}

export default App;
