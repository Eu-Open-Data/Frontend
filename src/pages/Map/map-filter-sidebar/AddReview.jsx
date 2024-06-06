import React, {useState} from "react";
import "./AddReview.css";
import SelectableStartIcon from "./SelectableStartIcon.jsx";

export default function AddReview(props) {
  const [content, setContent] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
      <div className="static" style={{marginTop: '30px'}}>
        <div className=" bg-white">

          <div className="input-box">
            <h3>How was the experience?</h3>

            <input
                id="add-comment"
                type="text"
                placeholder="It was awesome"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="add-rating-container">
            <div className="add-rating">
              {Array.from({ length: 5 }, (_, index) => (
                  <SelectableStartIcon
                      key={index}
                      filled={(hoverRating || rating) > index}
                      onMouseEnter={() => setHoverRating(index + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(index + 1)}
                  />
              ))}
            </div>
          </div>

          <div className="write-review">
            <button className="write-review-button" onClick={() => props.publish(content, rating)}>Publish</button>
          </div>
        </div>
      </div>
  );
}
