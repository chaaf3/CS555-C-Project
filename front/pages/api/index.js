const { default: axios } = require("axios");

axios.post("http://localhost:3001/contractors/images", {
  values: { image: image },
});
