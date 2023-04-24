import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
const ImageHandler = () => {
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  async function pleaseWork() {
    try {
      let temp = await axios.get("http://localhost:3001/contractors/images", {
        values: {
          id: "6423ab71b18ce2f0289517a0",
        },
      });
      setLoading(false);
      console.log(temp);
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  }
  return (
    <div>
      {!loading && <img src={display} />}
      <h1>Please enter your image</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let temp = await axios.get(
            "http://localhost:3001/contractors/images",
            {
              values: { images: image },
            }
          );
          let makeImage = new Image();
          makeImage.src = temp.data;
          console.log(makeImage.src);
          setDisplay(makeImage.src);
          setLoading(false);
        }}
      >
        <label>Image:</label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={async (e) => {
            setLoading(true);
            let fileReader = new FileReader();
            await fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = () => {
              setImage(fileReader.result);
            };
            console.log(image);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ImageHandler;
