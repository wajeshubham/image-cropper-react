import React, { useRef, useState } from "react";
import DynamicCropper from "./DynamicCropper";
import Compressor from "compressorjs";

const DynamicImage = ({ width, height }) => {
  const imageInput = useRef(null);

  const [imageToBeCropped, setImageToBeCropped] = useState(""); // state for original image base64
  const [croppedSrc, setCroppedSrc] = useState(""); // state for cropped image base64

  // execute this func after user selects an image
  const imagePicker = async (e) => {
    try {
      const file = e.target.files[0];
      // compress the file to reduce the size
      new Compressor(file, {
        quality: 0.6,
        success(normalizedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(normalizedFile);
          let encoded = "";

          reader.onloadend = () => {
            // get base64 of the compressed image file
            encoded = reader.result.toString();

            setImageToBeCropped(encoded);
            // once imageToBeCropped is set we will show the cropper
          };
        },
        error(error) {
          // handle compressorjs error
          console.log(error);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {imageToBeCropped ? (
        <DynamicCropper
          src={imageToBeCropped} // pass selected image base64 as a prop to our Cropper comp.
          width={width} // width and hight we will pass in App.js as prop to DynamicImagePicker comp.
          height={height}
          onCancel={() => {
            // execute when user hit cancel
            setImageToBeCropped("");
          }}
          setCroppedSrc={(src) => {
            // execute when user submits cropped image
            setImageToBeCropped("");
            // this is final image which you can upload on your bucket
            setCroppedSrc(src);
          }}
        />
      ) : (
        <>
          {/* Image picker input */}
          <input
            required
            ref={imageInput}
            type="file"
            id="image_input"
            accept="image/*"
            style={{ visibility: "hidden", margin: "0 10px" }}
            onChange={(e) => {
              imagePicker(e);
            }}
          />

          {/* This label is reference to above input field which is hidden */}
          {/* When you click on this label it will trigger above input field */}
          <label htmlFor={"image_input"}>
            {croppedSrc ? (
              // when there is a selected/cropped image show that image
              <img
                src={croppedSrc}
                style={{
                  width: width,
                  height: height,
                  borderRadius: "10px",
                }}
                alt="cropped_image"
              />
            ) : (
              // when there is no selected/cropped image show normal div
              <div
                style={{
                  background: "#f1f1f1",
                  width: width,
                  height: height,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px dashed black",
                  borderRadius: "10px",
                }}
              >
                <span style={{ color: "grey" }}>{"Add image"}</span>
              </div>
            )}
          </label>
        </>
      )}
    </>
  );
};

export default DynamicImage;
