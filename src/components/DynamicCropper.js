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
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
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
          <button
            onClick={() => {
              const imageElement = cropperRef?.current;
              const cropper = imageElement?.cropper;
              cropper.rotate(-90);
            }}
            className={styles.rotateBtnReverse}
          >
            <FiRotateCcw />
          </button>
        </div>
        <div>
          <button onClick={onCancel} className={styles.cropperBtn}>
            Cancel
          </button>
          <button size="small" onClick={onCrop} className={styles.cropperBtn}>
            Submit
          </button>
        </div>
      </div>
      <div className={styles.cropperOverlay}>
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
