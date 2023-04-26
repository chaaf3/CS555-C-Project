import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ImageHandler = () => {
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("user") ||
      localStorage.getItem("type") != "contractor"
    ) {
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
      <nav class="nav-bar">
        <Link
          href="Auth"
          class="page-link"
        >
          Sign In
        </Link>
        <Link
          href="Calendar"
          class="page-link"
        >
          Calendar
        </Link>
        <Link
          href="ImageHandler"
          class="page-link"
        >
          Upload Image
        </Link>
      </nav>
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
