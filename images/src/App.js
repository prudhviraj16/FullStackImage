import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64Image(base64String);

    };

    if (file) {
      reader.readAsDataURL(file);
    }

    // console.log(reader.result)
    if(file){
      axios
      .post("http://localhost:4000", {base64Image})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    }
    
  };

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor=""> Select File </label>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {data &&
        data?.map((item, index) => {
          const img = item.avatar.split(',')[1]
          return (
            <React.Fragment key={index}>
              <img
                src={`data:image/png;base64,${img}`}
                alt=""
                height="100px"
                width="100px"
              />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default App;
