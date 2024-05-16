// SearchResults.jsx
/* eslint-disable react/prop-types */
const SearchResults = ({ results }) => {
    return (
      <div className="search-results">
        <h2>Results</h2>
        <h3>Don&apos;t like what you see ? Search again . </h3>
        <br/>
        {results.length > 0 ? (
          <ul>
            {results.map((location, index) => (
              <li key={index}>
                <p>ID: {location.id}</p>
                <p>Țară: {location.country}</p>
                <p>Oraș: {location.city}</p>
                <p>Pet-friendly: {location.petFriendly ? "Da" : "Nu"}</p>
                <p>WiFi: {location.wifi ? "Da" : "Nu"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nu am găsit ce căutați.</p>
        )}
      </div>
    );
  }
  
  export default SearchResults;
  