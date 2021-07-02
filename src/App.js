import "./App.css";
import DynamicImage from "./components/DynamicImagePicker";

// IMPORTANT: import cropperjs css
// react-cropper won't work until you import it's css
import "cropperjs/dist/cropper.css";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* As this is dynamic image picker the height and width 
      that you pass here will apply in image and cropper dynamically */}
      <DynamicImage height="450px" width="450px" />
    </div>
  );
};

export default App;
