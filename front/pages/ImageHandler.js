import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import NavBar from "../Components/NavBar";

const ImageHandler = () => {
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("user") ||
      localStorage.getItem("type") != "contractor"
    ) {
      alert(
        "Only contractors may upload images of their solar panel progress."
      );
      window.location.href = "/Auth";
    }
  }, []);
  async function pleaseWork() {
    try {
      let temp = await axios.get(
        `http://localhost:3001/contractors/images${localStorage.getItem(
          "user"
        )}`
      );
      setLoading(false);
      return temp.data;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <header>Please enter your image</header>
      <NavBar />
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
              values: { images: image, id: localStorage.getItem("user") },
            }
          );
          let holder = await pleaseWork();
          let makeImage = new Image();
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
            setLoading(true);
            let fileReader = new FileReader();
            await fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = () => {
              setImage(fileReader.result);
            };
          }}
        />
        <input
          type="submit"
          value="Submit"
        />
      </form>

      {!loading && <img src={image} />}
    </div>
  );
};

export default ImageHandler;
