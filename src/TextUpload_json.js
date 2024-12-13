import React, { useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/esm/Button";
import TextArModal from "./TextArModal";
import "./styles.css";

function TextUpload_JSON({ onRestart }) {
  const [text, setText] = useState("");
  const [translatedTexts, setTranslatedTexts] = useState({
    text_en: "",
    text_bn: "",
    text_ur: "",
    text_ar: "",
    elapsed_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [marqueeStarted, setMarqueeStarted] = useState(false);
  const [forceStop, setForceStop] = useState(false); // State to track force stop
  const [marqueeSpeed, setMarqueeSpeed] = useState(500); // State for marquee speed
  const [delay, setDelay] = useState(3); // State for marquee delay
  const [textSize, setTextSize] = useState(140); // State for marquee speed
  const [showUpload, setShowUpload] = useState(true); // Controls visibility of upload UI
  /*
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/text", { text });
      
      setTranslatedTexts(response.data);
      
      if (response.data.text_ar) {
        setShowModal(true);
      }
      
      console.log("Text translation successful:", response.data);
      setMarqueeStarted(true);
      setShowUpload(false); // Hide upload UI after translation
    } catch (error) {
      console.error("Error translating text:", error);
    } finally {
      setLoading(false);
    }
  };*/
  const handleSubmit = async () => {
    try {
      setLoading(true);
  
      // Fetch translations from the JSON file
      const response = await fetch("/translations.json");
      if (!response.ok) {
        throw new Error("Failed to load translations file");
      }
  
      const data = await response.json();
      
      // Access the translations from the JSON file
      const translatedData = data.text;
  
      if (!translatedData) {
        throw new Error("No translations found in JSON");
      }
  
      setTranslatedTexts(translatedData);
  
      if (translatedData.text_ar) {
        setShowModal(true);
      }
  
      console.log("Text translation loaded successfully:", translatedData);
      setMarqueeStarted(true);
      setShowUpload(false); // Hide upload UI after translation
    } catch (error) {
      console.error("Error reading translations from JSON file:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setMarqueeStarted(true);
  };

  const handleShowUpload = () => {
    setShowUpload(true);
    setText("");
    onRestart(); // Call onRestart to show selection buttons in App
  };

  return (
    <div className="App">
      {showUpload ? (
        <>
          <h1 className="text-arabic">ترجمة النصوص</h1>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="أدخل النص هنا"
            rows="5"
            className="text-input m-3 p-2"
            style={{width:'300px',height:'150px',direction:"rtl",borderRadius:"10px"}}
          />
          <button className="translate-button btn btn-dark" onClick={handleSubmit} disabled={!text.trim()}>
            ترجم النص
          </button>
          <br />
          {loading && <Spinner animation="grow" style={{color:"#F5F5F5"}} />}
        </>
      ) : (
        <>
        <br/>
        <br/>
          <div className="translated-text">
            <p>
              {marqueeStarted && (
                <Marquee
                  className="text-english m-4 marquee-text"
                  play={!forceStop}
                  //style={{ fontSize: textSize }}
                  delay={delay}
                  speed={marqueeSpeed}
                >
                  {translatedTexts.text_en}
                </Marquee>
              )}
            </p>
            <hr />
            <br />
            <p>
                {marqueeStarted && (
                  <Marquee
                    className="text-urdu marquee-text"
                    play={!forceStop}
                    //style={{ fontSize:textSize,padding:'75px' }}
                    delay={delay}
                    speed={marqueeSpeed}
                    direction="right"
                  >
                    {translatedTexts.text_ur}
                  </Marquee>
                )}
              </p>
            <br />
            <hr />
            <p>
              {marqueeStarted && (
                <Marquee
                  className="text-bangali m-4 marquee-text"
                  play={!forceStop}
                  //style={{ fontSize: textSize}}
                  delay={delay}
                  speed={marqueeSpeed}
                >
                  {translatedTexts.text_bn}
                </Marquee>
              )}
            </p>
          </div>

          <h4
            className="m-2"
            style={{ textAlign: "center", color: "#F5F5F5" }}
          >
            الوقت المستغرق هو{" "}
            {Math.round(parseFloat(translatedTexts.elapsed_time))} ثانية
          </h4>

          {/* Slider to control Marquee speed */}
          <div style={{ textAlign: "center", color: "#F5F5F5" }}>
            <label>سرعة العرض: {marqueeSpeed}</label>
            <input
              type="range"
              min="10"
              max="1500"
              value={marqueeSpeed}
              onChange={(e) => setMarqueeSpeed(parseInt(e.target.value))}
              style={{ width: "80%", margin: "10px 0" }}
            />
          </div>

          <button
            className="btn btn-dark mt-3 upload-button"
            onClick={handleShowUpload}
          >
            إعادة
          </button>
        </>
      )}
            <TextArModal
        show={showModal}
        onHide={handleCloseModal}
        textAr={translatedTexts.text_ar}
      />

      {/* Force Stop Button */}
      {marqueeStarted && (
        <button
          className="btn btn-danger mt-3"
          onClick={() => setForceStop(!forceStop)} // Toggle forceStop state
        >
          توقف
        </button>
      )}
      <br />
    </div>
  );
}

export default TextUpload_JSON;
