import { useState, useEffect } from "react";
import "./PageDetails.css";
import StarIcon from "./StarIcon";
import icon1 from "/src/assets/Frame1.png";
import icon2 from "/src/assets/Frame2.png";
import icon3 from "/src/assets/Frame3.png";
import icon4 from "/src/assets/Frame4.png";
import icon5 from "/src/assets/Frame5.png";
/* eslint-disable react/prop-types */

const PageDetails = ({ location, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (location) {
        setIsLoading(false);
      } else {
        setError("Eroare la încărcarea detaliilor locației.");
        setIsLoading(false);
      }
    }, 1000);
  }, [location]);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const regulationsValue = 50;
  const pollutionValue = 20;
  const safetyValue = 80;

  const getNumberColor = (value) => {
    if (value > 50) return "green";
    if (value === 50) return "gold";
    return "red";
  };

  const getAdditionalText = (value) => {
    if (value > 50) return "(Very Good)";
    if (value === 50) return "(Moderate)";
    return "(Very Bad)";
  };

  return (
    <div className="page">
      {location && (
        <>
          <button className="repackButton" onClick={onClose}>
            &lt;
          </button>
          <div style={{ position: "relative" }}>
            <img
              src={location.imageUrl}
              alt={`Imagine pentru ${location.name}`}
              style={{ width: "100%", height: "256px" }}
            />
            <div className="favorite-heart" onClick={toggleFavorite}>
              ❤
            </div>
          </div>

          <div className="page-header">
            <div className="title-rating">
              <p
                style={{
                  fontSize: "20px",
                  color: "#1F1F1F",
                  fontWeight: "500",
                  marginLeft: "-1.5px",
                }}
              >
                {location.name}
              </p>
              <div className="rating-container">
                <div className="rating">
                  {Array.from(
                    { length: Math.floor(location.rating) },
                    (_, index) => (
                      <StarIcon key={index} />
                    )
                  )}
                </div>
                <span className="rating-number">
                  {location.rating.toFixed(1)}
                </span>
                <span className="votes-count">
                  ({location.votesCount}voturi)
                </span>
              </div>
            </div>
            <p
              style={{ fontSize: "10px", fontWeight: "400", color: "#595959" }}
            >
              {location.type} <strong>•</strong> {location.address}
            </p>
            <p style={{ fontSize: "10px", fontWeight: "400", color: "#777" }}>
              Open <strong>•</strong> {location.openHours} - Closes:{" "}
              {location.closeHours}
            </p>
          </div>

          {isLoading ? (
            <p className="loading-text">Se încarcă...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="result-details">
              <div className="icons-section">
                <div className="icon-item">
                  <img src={icon4} alt="Location" className="info-icon" />
                  <span>{location.address}</span>
                </div>
                <div className="icon-item">
                  <img src={icon5} alt="Website" className="info-icon" />
                  <a href={location.website}>{location.website}</a>
                </div>
                <br />
                <div className="icon-item">
                  <img src={icon1} alt="Safety Index" className="info-icon" />
                  <span>Safety Index</span>
                  <span
                    className="number-value"
                    style={{ color: getNumberColor(safetyValue) }}
                  >
                    {safetyValue} {getAdditionalText(safetyValue)}
                  </span>
                </div>
                <div className="icon-item">
                  <img src={icon2} alt="Regulations" className="info-icon" />
                  <span>Regulations</span>
                  <span
                    className="number-value"
                    style={{ color: getNumberColor(regulationsValue) }}
                  >
                    {regulationsValue} {getAdditionalText(regulationsValue)}
                  </span>
                </div>
                <div className="icon-item">
                  <img src={icon3} alt="Pollution" className="info-icon" />
                  <span>Pollution</span>
                  <span
                    className="number-value"
                    style={{ color: getNumberColor(pollutionValue) }}
                  >
                    {pollutionValue} {getAdditionalText(pollutionValue)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PageDetails;
