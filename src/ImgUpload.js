import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Marquee from "react-fast-marquee";
import MarqueeControls from "./components/MarqueeControls";
import MarqueeDisplay from "./components/MarqueeDisplay";
import ImageUploadArea from "./components/ImageUploadArea";
import ImagePreviewList from "./components/ImagePreviewList";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import TextArModal from "./TextArModal";
import "./styles.css";

function ImgUpload({ onRestart }) {
  const [images, setImages] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
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

      const response = await await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // <-- correctly placed
        }
      );

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
    <div className="App" style={{marginTop:"75px"}}>
      {showUpload ? (
        <>
          
          <h1 className="text-marai m-4" style={{color:"var(--Gray-1)"}}>مترجم خطبة الجمعة</h1>
          

          <ImageUploadArea
          onDrop={(acceptedFiles) => {
            if (images.length + acceptedFiles.length > maxNumber) {
              alert(`Maximum number of images (${maxNumber}) exceeded.`);
              return;
            }
            const newImages = acceptedFiles.map((file) => ({
              file,
              preview: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newImages]);
          }}
        />
          
          <ImagePreviewList className="m-4" images={images} onRemove={handleRemoveImage} />
          
          <button
             className="m-4 translate-button btn btn-dark"
            disabled={images.length == 0? true:false}
            onClick={handleUpload}
          >
            ترجم الخطبة
          </button>
          <br />
          {loading && <Spinner animation="grow" style={{color:"var(--Black)"}} />}
        </>
      ) : (
        <>
        <MarqueeDisplay
            className="m-5"
            texts={translatedTexts}
            speed={marqueeSpeed}
            delay={delay}
            textSize={textSize}
            play={!forceStop && marqueeStarted}
          />
          <h4
            className="m-2"
            style={{ textAlign: "center", color: "var(--Black)" }}
          >
            الوقت المستغرق هو{" "}
            {Math.round(parseFloat(translatedTexts.elapsed_time))} ثانية
          </h4>

          {/* Slider to control Marquee speed */}
          <MarqueeControls
            speed={marqueeSpeed}
            setSpeed={setMarqueeSpeed}
            forceStop={forceStop}
            disabled={false}
            setForceStop={setForceStop}
            onReset={() => {
              setShowUpload(true);
              setImages([]);
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

export default ImgUpload;
