import icon1 from "/src/assets/Frame1.png"; // Replace with the path to your icon
import icon2 from "/src/assets/Frame2.png"; // Replace with the path to your icon
import icon3 from "/src/assets/Frame3.png"; // Replace with the path to your icon
import "./SearchResults.css";
/* eslint-disable react/prop-types */

const SearchResults = ({ results, onButtonClicked, onSearchStop }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">
          ★
        </span>
      ); // Full stars
    }
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <span key={i} className="star empty">
          ★
        </span>
      ); // Empty stars
    }

    return stars;
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
  };

  return (
    <div className="search-results">
      <div style={{ margin: "16px" }}>
        <p
          style={{
            textAlign: "left",
            fontSize: "24px",
            fontWeight: "500",
            color: "#1F1F1F",
          }}
        >
          Results
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "12px",
            fontWeight: "400",
            color: "#595959",
            display: "inline",
          }}
        >
          Don&apos;t like what you see?{" "}
        </p>
        <button
          className="search-again-button"
          style={{ border: "none" }}
          onClick={() => {
            onSearchStop(); // Call onSearchStop to reset the search
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#5CC1F9",
              display: "inline",
            }}
          >
            Search again
          </p>
        </button>{" "}
      </div>

      <div>
        {results.length > 0 ? (
          <ul style={{ listStyleType: "none" }}>
            {results.map((location) => (
              <li
                key={location.id}
                style={{ borderBottom: "1px solid #BFBFBF" }}
              >
                <button
                  className="listItem"
                  onClick={() => onButtonClicked(location)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ flexGrow: 1, marginRight: "16px" }}>
                      <div>
                        <p
                          style={{
                            fontSize: "20px",
                            color: "#1F1F1F",
                            fontWeight: "500",
                          }}
                        >
                          {location.name}
                        </p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {renderStars(location.rating)}
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#595959",
                              marginLeft: "8px",
                            }}
                          >
                            {location.rating} (
                            {location.votes?.toLocaleString()})
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: "400",
                            color: "#595959",
                          }}
                        >
                          {location.type} <strong>•</strong> {location.address}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: "400",
                            color: "#777",
                          }}
                        >
                          Open: {location.openHours} - Close:{" "}
                          {location.closeHours}
                        </p>
                        <div className="icons-container">
                          {[icon1, icon2, icon3].map((icon, index) => {
                            let number = getRandomNumber();
                            if (index === 0)
                              number =
                                Math.round(
                                  ((location.safety_index_score - 1) * 99) / 2.5
                                ) + 1;
                            else if (index === 1)
                              number = location.weather.humidity;
                            else
                              number =
                                ((location.air_pollution.aqi - 1) * 99) / 2 + 1;
                            let numberColor = "";
                            if (number === 50) numberColor = "gold";
                            else if (number > 70) numberColor = "green";
                            else if (number > 50) numberColor = "orange";
                            else if (number > 25) numberColor = "lime";
                            else if (number >= 0) numberColor = "red";

                            return (
                              <div key={index} className="icon-container">
                                <img
                                  src={icon}
                                  alt={`Icon ${index + 1}`}
                                  className="icon"
                                />
                                <span
                                  className="icon-number"
                                  style={{ color: numberColor }}
                                >
                                  {number}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <img
                      src={location.imageUrl}
                      alt={`Image for ${location.name}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#595959",
            }}
          >
            Nu am găsit ce căutați.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
