import React, { useRef, useState } from "react";
import DynamicCropper from "./DynamicCropper";
import Compressor from "compressorjs";

const DynamicImage = ({ width, height }) => {
  const imageInput = useRef(null);

  const [imageToBeCropped, setImageToBeCropped] = useState("");
  const [croppedSrc, setCroppedSrc] = useState("");

  const imagePicker = async (e) => {
    try {
      const file = e.target.files[0];
      // compress the file to reduce upload time
      new Compressor(file, {
        quality: 0.6,
        success(normalizedFile) {
          const reader = new FileReader();
          reader.readAsDataURL(normalizedFile);
          let encoded = "";

          reader.onloadend = () => {
            // get base64 of the image file
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
          src={imageToBeCropped}
          width={width}
          height={height}
          onCancel={() => {
            setImageToBeCropped("");
          }}
          setCroppedSrc={(src) => {
            setImageToBeCropped("");
            // this is final image which you can upload on your bucket
            setCroppedSrc(src);
          }}
        />
      ) : (
        <>
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
          <label htmlFor={"image_input"}>
            {croppedSrc ? (
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
