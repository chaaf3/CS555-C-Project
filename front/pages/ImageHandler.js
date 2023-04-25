import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
const ImageHandler = () => {
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/Auth";
    }
  }, []);
  async function pleaseWork() {
    try {
      let temp = await axios.get("http://localhost:3001/contractors/images", {
        values: {
          id: "6423ab71b18ce2f0289517a0",
        },
      });
      setLoading(false);
      return temp.data.values.images;
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  }
  return (
    <div>
      {!loading && <img src={image} />}
      <h1>Please enter your image</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (image == null) {
            alert("Please enter an image");
            return;
          }
          let temp = await axios.post(
            "http://localhost:3001/contractors/images",
            {
              values: { images: image },
            }
          );

          let holder = await pleaseWork();
          let makeImage = new Image();
          //console.log(holder);
          makeImage.src = holder;
          //console.log(holder.images);
          setImage(makeImage.src);
          setLoading(false);
        }}
      >
        <label>Image:</label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={async (e) => {
            try {
              setLoading(true);
              let fileReader = new FileReader();
              await fileReader.readAsDataURL(e.target.files[0]);
              fileReader.onload = () => {
                setImage(fileReader.result);
              };
            } catch (e) {
              console.log(e);
            }

            //console.log(image);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ImageHandler;
