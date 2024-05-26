import { useState, useEffect } from "react";
import "./PageDetails.css";
import StarIcon from "./StarIcon";
/* eslint-disable react/prop-types */

const PageDetails = ({ location, locationsData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const selectedLocationData = location && locationsData && locationsData.find(
        (loc) => loc.id === location.id
      );
      if (selectedLocationData) {
        setIsLoading(false);
      } else {
        setError("Eroare la încărcarea detaliilor locației.");
        setIsLoading(false);
      }
    }, 1000);
  }, [location, locationsData]); 

  return (
    <div className="page">
      {/* Imagine */}
      <img
        src={location.imageUrl}
        alt={`Imagine pentru ${location.name}`}
        style={{ width: "100%", height: "256px" }}
      />

      {/* Header */}
      <div className="page-header">
        <span className="result-name">{location.name}</span>
        <div className="rating-container">
          <div className="rating">
            {Array.from({ length: Math.floor(location.rating) }, (_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
          <span className="rating-number">{location.rating.toFixed(1)}</span> {/* Rating cu o zecimală */}
          <span className="votes-count">({location.votesCount} voturi)</span>
        </div>
      </div>

      {/* Detalii locație */}
      {isLoading ? (
        <p>Se încarcă...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="result-details">
          <p className="result-type">
            <span className="result-type-icon">📍</span> {location.type}
          </p>
          <p className="result-address">{location.address}</p>
          <p className="result-phone">
            <span className="result-detail-icon">📞</span> {location.phone}
          </p>
          <p className="result-website">
            <span className="result-detail-icon">🌐</span> {location.website}
          </p>
          <p className="result-description">{location.description}</p>
          {/* Adaugă alte detalii relevante (amenities, etc.) în același format */}
          <h3 style={{ margin: "16px 0" }}>Amenities:</h3>
          <ul>
            {location.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Restul conținutului (butoane, etc.) */}
    </div>
  );
};

export default PageDetails;
