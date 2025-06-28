import React, { useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/esm/Button";
import MarqueeControls from "./components/MarqueeControls";
import MarqueeDisplay from "./components/MarqueeDisplay";
import TextArModal from "./TextArModal";
import "./styles.css";

function TextUpload({ onRestart }) {
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/text", { text },{withCredentials:true});
      
      setTranslatedTexts(response.data);
      
      if (response.data.text_ar) {
        setShowModal(true); // Let modal open first
      } else {
        setMarqueeStarted(true); // No modal? Start marquee right away
      }
      
      console.log("Text translation successful:", response.data);
      setShowUpload(false); // Hide upload UI after translation
    } catch (error) {
      console.error("Error translating text:", error);
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
          <h1 className="text-arabic m-2">ترجمة النصوص</h1>
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
        <MarqueeDisplay
            texts={translatedTexts}
            speed={marqueeSpeed}
            delay={delay}
            textSize={textSize}
            play={!forceStop && marqueeStarted}
          />

          <h4
            className="m-2"
            style={{ textAlign: "center", color: "#F5F5F5" }}
          >
            الوقت المستغرق هو{" "}
            {Math.round(parseFloat(translatedTexts.elapsed_time))} ثانية
          </h4>

          <MarqueeControls
            speed={marqueeSpeed}
            setSpeed={setMarqueeSpeed}
            forceStop={forceStop}
            setForceStop={setForceStop}
            onReset={() => {
              setShowUpload(true);
              setText("");
              onRestart();
            }}
          />
        </>
      )}
            <TextArModal
            show={showModal}
            onHide={handleCloseModal}
            textAr={translatedTexts.text_ar}
          />

    </div>
  );
}

export default TextUpload;