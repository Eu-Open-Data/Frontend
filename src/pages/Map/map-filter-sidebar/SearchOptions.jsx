/* eslint-disable react-hooks/exhaustive-deps*/
import "./SearchOptions.css";
import getData from "../map-filter-sidebar/fetch.enum.js";
import fetchData from "../map-filter-sidebar/FiltersController.js";
import { useEffect, useState } from "react";

const SearchOptions = ({ input, position, setInput }) => {
  const [options, setOptions] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleInput = () => {
    setOptions(
      amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    handleInput();
  }, [input, amenities]);

  const fetchAmenities = async () => {
    try {
      const response = await fetchData(getData.AMENITIES);
      const amenit = JSON.parse(response);
      setAmenities(Array.isArray(amenit) ? amenit : []);
    } catch (error) {
      console.error("Error fetching amenities:", error);
      setAmenities([]);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    setInput(selectedOption);
  };

  return (
    <div className="search-container" style={{ ...position }}>
      <ul className="options-list">
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionSelect(option.name)}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchOptions;
