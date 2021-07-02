import React, { useRef } from "react";
import { Cropper } from "react-cropper";
import styles from "./styles.module.css";

import { FiRotateCcw, FiRotateCw } from "react-icons/fi";

const DynamicCropper = ({
  src,
  width,
  height,
  setCroppedSrc = (f) => f,
  onCancel = (f) => f,
}) => {
  const cropperRef = useRef(null);

  const onCrop = () => {
    // this function will trigger when user clicks on submit
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;

    // it will conver cropped image into base64
    setCroppedSrc(cropper.getCroppedCanvas().toDataURL());
  };

  if (!src) {
    return null;
  }

  return (
    <>
      <div className={styles.cropperBtnStrip}>
        {/* action buttons for submit/cancel/rotate right/rotate left */}

        <div>
          {/* Button responsible for 90 degree right rotation */}
          <button
            onClick={() => {
              const imageElement = cropperRef?.current;
              const cropper = imageElement?.cropper;
              cropper.rotate(90);
            }}
            className={styles.rotateBtn}
          >
            <FiRotateCw />
          </button>

          {/* Button responsible for 90 degree left rotation */}
          <button
            onClick={() => {
              const imageElement = cropperRef?.current;
              const cropper = imageElement?.cropper;
              cropper.rotate(-90);
            }}
            className={styles.rotateBtn}
          >
            <FiRotateCcw />
          </button>
        </div>

        <div>
          {/* Button responsible for closing without crop */}
          <button onClick={onCancel} className={styles.cropperBtn}>
            Cancel
          </button>

          {/* Button responsible for cropping the image */}
          <button size="small" onClick={onCrop} className={styles.cropperBtn}>
            Submit
          </button>
        </div>
      </div>

      <div className={styles.cropperOverlay}>
        {/* react-cropper component */}
        <Cropper
          src={src}
          style={{
            width: width,
            height: height,
            position: "fixed",
          }}
          aspectRatio={
            // remove this if you want to keep cropper flexible
            parseInt(width.split("px")) / parseInt(height.split("px"))
          }
          rotatable={true}
          guides={true}
          ref={cropperRef}
          className={styles.cropperContainer}
        />
      </div>
    </>
  );
};

export default DynamicCropper;
