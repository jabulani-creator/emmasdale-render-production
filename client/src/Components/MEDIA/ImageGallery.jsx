import React from "react";

const ImageGallery = ({ image, department }) => {
  return (
    <div className="image">
      <img src={image} alt={department} className="img" />
    </div>
  );
};

export default ImageGallery;
