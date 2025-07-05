// components/ImageUploadArea.jsx
import React from "react";
import { useDropzone } from "react-dropzone";

function ImageUploadArea({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="upload__image-wrapper"
      style={{
        border: `2px dashed ${isDragActive ? "red" : "gray"}`,
        borderRadius: "10px",
      }}
    >
      <input {...getInputProps()} />
      <div
        style={{
          textAlign: "center",
          color: "var(--Gray-1)",
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
  );
}

export default ImageUploadArea;
