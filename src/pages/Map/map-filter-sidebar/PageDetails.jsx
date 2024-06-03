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
  const [activeSection, setActiveSection] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const renderOverview = () => (
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
  );

  const renderReviews = () => (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>Rating</h2>
        <div className="rating-container">
          <div className="rating">
            {Array.from({ length: Math.floor(location.rating) }, (_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
          <span className="rating-number">{location.rating.toFixed(1)}</span>
          <span className="votes-count">({location.votesCount} voturi)</span>
        </div>
      </div>
      <div className="write-review">
        <button className="write-review-button">Write a review</button>
      </div>
      <div className="rating-divider"></div> {/* Aici adaugă linia */}
      <div className="reviews-list">
        {location.reviews && location.reviews.length > 0 ? (
          location.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-author">
                <h3>{review.author}</h3>
                <div className="review-rating">
                  {Array.from({ length: Math.floor(review.rating) }, (_, index) => (
                    <StarIcon key={index} />
                  ))}
                </div>
              </div>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
  
  
  

  const renderMore = () => (
    <div className="more-section">
      <h2>More Locations</h2>
      {location.similarLocations && location.similarLocations.length > 0 ? (
        location.similarLocations.map((similarLocation, index) => (
          <div key={index} className="similar-location-item">
            <h3>{similarLocation.name}</h3>
            <p>{similarLocation.address}</p>
            <p>{similarLocation.hours}</p>
            <a
              href={similarLocation.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {similarLocation.website}
            </a>
          </div>
        ))
      ) : (
        <p>No similar locations available.</p>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Overview":
        return renderOverview();
      case "Reviews":
        return renderReviews();
      case "More":
        return renderMore();
      default:
        return null;
    }
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
                  ({location.votesCount} voturi)
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

          <div className="section-buttons">
            <button
              onClick={() => handleSectionClick("Overview")}
              className={activeSection === "Overview" ? "active" : ""}
            >
              Overview
            </button>
            <button
              onClick={() => handleSectionClick("Reviews")}
              className={activeSection === "Reviews" ? "active" : ""}
            >
              Reviews
            </button>
            <button
              onClick={() => handleSectionClick("More")}
              className={activeSection === "More" ? "active" : ""}
            >
              More
            </button>
          </div>

          {isLoading ? (
            <p className="loading-text">Se încarcă...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            renderContent()
          )}
        </>
      )}
    </div>
  );
};

export default PageDetails;
