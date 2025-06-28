// components/ImagePreviewList.jsx
import React from "react";

function ImagePreviewList({ images, onRemove }) {
  return (
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
              onClick={() => onRemove(index)}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImagePreviewList;
