import { useRef, useState } from "react";
import "./MyAlbum.css";

function MyAlbum() {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
    // Auto resize textarea
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <div className="container">
      <div className="container-album">
        <h1 className="title">My Album</h1>
        {image && (
          <div className="album-content">
            <img src={URL.createObjectURL(image)} alt="photo" className="display-album"/>
            <p className="details">{details}</p>
          </div>
        )}
      </div>
      <div className="container-post-vacation">
        <textarea
          className="top-paragraph"
          value={details}
          onChange={handleDetailsChange}
          placeholder="Write your details here..."
          rows="4" // Set initial number of rows
        />
        <h2 className="bottom-title">Post your vacation</h2>
      </div>
      <div className="container-add-photo">
        <h2 className="title-add-photo">Add your photos</h2>
        <div className="add-photo">
          <div onClick={handleImageClick}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="photo"
                className="display-after"
              />
            ) : (
              <img
                src="src/assets/upload-image.png"
                alt="upload-photo"
                className="display-before"
              />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <button className="add-photo-button">Browse</button>
        </div>
      </div>
    </div>
  );
}

export default MyAlbum;
