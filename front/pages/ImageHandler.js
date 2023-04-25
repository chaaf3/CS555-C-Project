import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
      {!loading && <img src={display} />}
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
        <input
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default ImageHandler;
