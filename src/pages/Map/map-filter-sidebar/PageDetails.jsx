import { useState, useEffect, useReducer } from "react";
import "./PageDetails.css";
import StarIcon from "./StarIcon";
import icon1 from "/src/assets/Frame1.png";
import icon2 from "/src/assets/Frame2.png";
import icon3 from "/src/assets/Frame3.png";
import icon4 from "/src/assets/Frame4.png";
import icon5 from "/src/assets/Frame5.png";
import UserIcon from "/src/assets/user_icon.png";
import { requestPost } from "./DevController.js";
import getData from "./fetch.enum.js";
import AddReview from "./AddReview.jsx";
import useToggle from "./useToggle.js";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { fetchData } from "./DevController.js";
/* global google */

const PageDetails = ({ location, map, setLocation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [similarLocations, setSimilarLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { on, toggler } = useToggle();
  const [newReview, setNewReview] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://54.167.96.255:5000/recommend/${location.hotel_id}?max_count=10`
      )
      .then((res) => {
        let data = res.data.replaceAll("NaN", '""');
        let results = JSON.parse(data);
        let promises = [];
        let service = new google.maps.places.PlacesService(map);
        results.forEach((x) => {
          promises.push(
            new Promise((resolve, reject) => {
              service.findPlaceFromQuery(
                {
                  query: x.name + " " + x.address,
                  fields: ["place_id", "photos"],
                },
                (results, status) => {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    if (!results || !results[0].photos) {
                      resolve(""); // Resolve with null if no results or no photos
                    } else {
                      x.photo = results[0].photos[0].getUrl();
                      if (x.photo == null) x.photo = "";
                      resolve(x);
                    }
                  } else {
                    reject(`PlacesServiceStatus not OK: ${status}`);
                  }
                }
              );
            })
          );
        });

        Promise.allSettled(promises).then((results) => {
          results = results.map((x) => x.value);

          setSimilarLocations(results);
        });
      });
    axios.get(
      `http://54.167.96.255:5000/location/${
        location.hotel_id
      }?token=${sessionStorage.getItem("token")}`
    );

    setTimeout(async () => {
      if (location) {
        setIsLoading(false);
      } else {
        setError("Eroare la încărcarea detaliilor locației.");
        setIsLoading(false);
      }
    }, 1000);
  }, [location, map]);

  useEffect(() => {
    if (activeSection === "Reviews") {
      axios
        .get(
          `http://54.167.96.255:8081/location/review/all/${location.hotel_id}`
        )
        .then((res) => {
          setReviews([...res.data]);
        })
        .catch((error) => console.error(error));
    }
  }, [activeSection, location.hotel_id, newReview]);

  const addReview = async (content, rating) => {
    let toSendObject = {
      token: sessionStorage.getItem("token"),
      hotel: {
        id: location.hotel_id,
      },
      reviewComment: content,
      rating: rating,
    };

    const response = await requestPost(getData.REVIEW.CREATE, toSendObject);
    await console.log(response);
    if (response != null) {
      setNewReview(response);
    }
    // AICI AR TREBUI SA RETURNAM ID-UL REVIEW-ULUI DAR DAT FIIND FAPTUL CA NU MAI E TIMP .. RAMANE ASA URAT

    //reviews.push(newReview);
    //setReviews([...reviews, newReview]);

    forceUpdate();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  let safety = 0;
  let humidity = 0;
  let pollution = 0;
  if (location.safety_index_score) {
    safety = Math.round(((location.safety_index_score - 1) * 99) / 2.5) + 1;
    humidity = location.weather.humidity;
    pollution = ((location.air_pollution.aqi - 1) * 99) / 2 + 1;
  }

  const getNumberColor = (value) => {
    if (value === 50) return "gold";
    if (value > 70) return "green";
    if (value > 50) return "orange";
    if (value > 25) return "lime";
    if (value >= 0) return "red";
  };

  const getAdditionalText = (value) => {
    if (value === 50) return "(Moderate)";
    if (value > 70) return "(Very good)";
    if (value > 50) return "(Good)";
    if (value > 25) return "(Bad)";
    if (value >= 0) return "(Very bad)";
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
          <a href={location.website_url}>{location.website_url}</a>
        </div>
        <br />
        <div className="icon-item">
          <img src={icon1} alt="Safety Index" className="info-icon" />
          <span>Safety Index</span>
          <span
            className="number-value"
            style={{ color: getNumberColor(safety) }}
          >
            {safety} {getAdditionalText(safety)}
          </span>
        </div>
        <div className="icon-item">
          <img src={icon2} alt="Regulations" className="info-icon" />
          <span>Air Humidity</span>
          <span
            className="number-value"
            style={{ color: getNumberColor(humidity) }}
          >
            {humidity} {getAdditionalText(humidity)}
          </span>
        </div>
        <div className="icon-item">
          <img src={icon3} alt="Pollution" className="info-icon" />
          <span>Air Quality Index</span>
          <span
            className="number-value"
            style={{ color: getNumberColor(pollution) }}
          >
            {pollution} {getAdditionalText(pollution)}
          </span>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => {
    console.log(reviews);
    return (
      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Rating</h2>
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
              {parseFloat(location.rating)?.toFixed(1)}
            </span>
            <span className="votes-count">({location.votesCount} voturi)</span>
          </div>
        </div>
        <div>
          {on && (
            <AddReview
              toggler={toggler}
              publish={(content, rating) => {
                addReview(content, rating);
                toggler();
              }}
            />
          )}
        </div>
        {!on && (
          <div className="write-review">
            <button className="write-review-button" onClick={() => toggler()}>
              Write a review
            </button>
          </div>
        )}
        <div className="rating-divider"></div> {/* Aici adaugă linia */}
        <div className="reviews-list">
          {reviews && reviews.length > 0 ? (
            //reviews.filter((review)=>review.rating!=0).
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-author">
                  <div className="review-icon">
                    <img src={UserIcon} alt="User icon" className="user-icon" />
                  </div>
                  <div className="review-author-name">
                    <h3>{review.user.username}</h3>
                    <p>{review.review.reviewComment}</p>
                  </div>
                </div>
                <div className="review-rating">
                  {Array.from(
                    { length: Math.floor(review.review.rating) },
                    (_, index) => (
                      <StarIcon key={index} />
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    );
  };

  const renderMore = () => (
    <div className="more-section">
      <h2>More Locations</h2>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gap: "8px",
          gridTemplateColumns: "auto auto auto",
        }}
      >
        {similarLocations && similarLocations.length > 0 ? (
          similarLocations.map((similarLocation) => {
            if (!similarLocation) return;
            return (
              <div
                key={similarLocation.hotel_id}
                style={{ display: "inline" }}
                className="similar-location-item"
              >
                <button
                  onClick={() => {
                    setLocation(similarLocation);
                    setActiveSection("Overview");
                  }}
                  style={{
                    borderRadius: "16px",
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <img
                    src={similarLocation.photo}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "16px",
                    }}
                  />
                </button>
              </div>
            );
          })
        ) : (
          <p>No similar locations available.</p>
        )}
      </div>
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
          <div style={{ position: "relative" }}>
            <img
              src={location.photo ?? ""}
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
                  {parseFloat(location.rating)?.toFixed(1)}
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
