import React, { useEffect, useState } from "react";
import axios from "axios";
const ImageHandler = () => {
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(false);

  return (
    <div>
      {display && <img src={URL.createObjectURL(image)} />}
      <h1>Please enter your image</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setDisplay(true);
          console.log("here");
          console.log(image);
        }}
      >
        <label>Image:</label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            console.log(image);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageHandler;
