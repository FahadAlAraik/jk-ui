import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Marquee from "react-fast-marquee";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import TextArModal from "./TextArModal";
import "./styles.css";

function ImgUpload({ onRestart }) {
  const [images, setImages] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
  const [translatedTexts, setTranslatedTexts] = useState({
    text_en: "",
    text_indo: "",
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
  
  const maxNumber = 69;

  const onDrop = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > maxNumber) {
      alert(`Maximum number of images (${maxNumber}) exceeded.`);
      return;
    }
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleShowUpload = () => {
    setShowUpload(true);
    setImages([]);
    onRestart(); // Call onRestart to show selection buttons in App
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image-${index + 1}`, image.file);
      });

      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTranslatedTexts(response.data);
      setShowUpload(false);

      if (response.data.text_ar) {
        setShowModal(true);
      }

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMarqueeStarted(true);
  };

  useEffect(() => {
    if (showUpload) {
      setMarqueeStarted(false);
    }
  }, [showUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg",
  });

  return (
    <div className="App">
      {showUpload ? (
        <>
          <br />
          <h1 className="text-arabic">مترجم خطبة الجمعة</h1>
          <br />
          <div
            {...getRootProps()}
            className="upload__image-wrapper"
            style={
              isDragActive
                ? { border: "2px dashed red", borderRadius: "10px" }
                : { border: "2px dashed gray", borderRadius: "10px" }
            }
          >
            <input {...getInputProps()} />
            <div
              style={{
                textAlign: "center",
                color: "#F5F5F5",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <i
                className="fas fa-cloud-upload-alt"
                style={{ fontSize: "50px", marginBottom: "10px" }}
              ></i>
              <p style={{ fontSize: "18px" }}>اسحب الصور او اضغط لرفع الصور</p>
            </div>
          </div>
          <br />
          <div className="image-list" style={{ color: "#F5F5F5" }}>
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.preview} alt="" width="100" />
                <div className="image-item__name m-2">
                  <p>{image.file.name}</p>
                </div>
                <div className="image-item__btn-wrapper">
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => handleRemoveImage(index)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
          <br />
          <button
            className="translate-button btn btn-dark"
            disabled={images.length == 0? true:false}
            onClick={handleUpload}
          >
            ترجم الخطبة
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
                  className="text-english m-4"
                  play={!forceStop}
                  style={{ fontSize: textSize }}
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
                    className="text-urdu"
                    play={!forceStop}
                    style={{ fontSize:textSize,padding:'75px' }}
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
                  className="text-english m-4"
                  play={!forceStop}
                  style={{ fontSize: textSize}}
                  delay={delay}
                  speed={marqueeSpeed}
                >
                  {translatedTexts.text_indo}
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

export default ImgUpload;
