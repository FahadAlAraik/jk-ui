import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";

function HandleImages({ images, setShowUpload }) {  // Accept setShowUpload as a prop
  const [translatedTexts, setTranslatedTexts] = useState({
    text_en: "",
    text_hi: "",
    text_ur: ""
  });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image-${index + 1}`, image.file);
      });

      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the state with the response data
      setTranslatedTexts(response.data);

      // Hide the upload interface
      setShowUpload(false);

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="handle-images">
      <h1>Upload Images</h1>
      <button onClick={handleUpload}>Upload Images</button>

      {/* Display the translated texts */}
      <div className="translated-texts">
        <p>
          <Marquee style={{ fontSize: "75px" }} delay={10} speed={175}>
            {translatedTexts.text_en}
          </Marquee>
        </p>
        <hr />
        <p>
          <Marquee style={{ fontSize: "75px" }} delay={10} speed={80}>
            {translatedTexts.text_hi}
          </Marquee>
        </p>
        <hr />
        <p>
          <Marquee style={{ fontSize: "75px" }} delay={10} speed={80}>
            {translatedTexts.text_ur}
          </Marquee>
        </p>
      </div>
    </div>
  );
}

export default HandleImages;
