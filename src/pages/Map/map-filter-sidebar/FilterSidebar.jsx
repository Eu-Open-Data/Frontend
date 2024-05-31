/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useRef, useState } from "react";
import LoadingPage from "./LoadingPage";
import SearchResults from "./SearchResults";
import "./FilterSidebar.css";
import "./SearchOptions.css";
import PageDetails from "./PageDetails.jsx";
import getData from "../map-filter-sidebar/fetch.enum.js";
import fetchData from "../map-filter-sidebar/FiltersController.js";
import SearchOptions from "./SearchOptions.jsx";
const FilterSidebar = ({ toggleFilters }) => {
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [countrySelected, setCountrySelected] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [input, setInput] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [inputPosition, setInputPosition] = useState({});
  const [options, setOptions] = useState([]);
  const inputRefs = useRef({});
  const locationsData = [
    {
      id: 1,
      name: "Hotel Confort",
      type: "Hotel",
      address: "Strada Lalelelor, Nr. 15",
      rating: 4.2,
      votes: 1405,
      openHours: "08:00",
      closeHours: "22:00",
      imageUrl:
        "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
      description: "A",
      amenities: ["Piscină", "Restaurant", "Saună", "Parcare gratuită"],
      phone: "+40 123 456 789",
      website: "https://www.hotelconfort.ro",
    },
    {
      id: 2,
      name: "Pensiunea Bucovina",
      type: "Pensiune",
      address: "Strada Principala, Nr. 22",
      rating: 3.8,
      votes: 980,
      openHours: "08:00",
      closeHours: "22:00",
      imageUrl:
        "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
      description: "B",
      amenities: ["Piscină", "Restaurant", "Saună", "Parcare gratuită"],
      phone: "+40 123 456 789",
      website: "https://www.hotelconfort.ro",
    },
    {
      id: 3,
      name: "Cabana La Munte",
      type: "Cabana",
      address: "Strada Padurii, Nr. 10",
      rating: 4.7,
      votes: 2003,
      openHours: "08:00",
      closeHours: "22:00",
      imageUrl:
        "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
      description: "C",
      amenities: ["Piscină", "Restaurant", "Saună", "Parcare gratuită"],
      phone: "+40 123 456 789",
      website: "https://www.hotelconfort.ro",
    },
    {
      id: 4,
      name: "Vila Maria",
      type: "Vila",
      address: "Strada Florilor, Nr. 8",
      rating: 4.0,
      votes: 850,
      openHours: "08:00",
      closeHours: "22:00",
      imageUrl:
        "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
      description: "D",
      amenities: ["Piscină", "Restaurant", "Saună", "Parcare gratuită"],
      phone: "+40 123 456 789",
      website: "https://www.hotelconfort.ro",
    },
  ];
  const handleInput = () => {
    setOptions(
      amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };
  const handleOptionSelect = (selectedOption) => {
    setInput(selectedOption);
  };
  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    handleInput();
  }, [input, amenities]);
  const handleCountryChange = async (country) => {
    setCountrySelected(!!country);
    setFilters((prevFilters) => ({
      ...prevFilters,
      country,
      city: "", // Reset city filter when country changes
    }));
    if (country) {
      await fetchCities(country);
    } else {
      setAllCities([]);
    }
  };
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

    if (filterName === "country") {
      setCountrySelected(!!value);
      fetchCities(value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        city: "", // Reset city filter when country changes
      }));
    }
  };
  const handleClosePageDetails = () => {
    setSelectedLocation(null);
  };

  const handleSearchStop = () => {
    setSearchResults(null);
    setSelectedLocation(null);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let filteredResults = [...locationsData];

      if (filters.country) {
        filteredResults = filteredResults.filter(
          (location) => location.country === filters.country
        );
      }

      if (filters.city) {
        filteredResults = filteredResults.filter((location) =>
          location.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }

      // Other filters...

      setSearchResults(filteredResults);
      setLoading(false);
    } catch (error) {
      console.error("Error during filter simulation:", error);
      setLoading(false);
    }
  };

  const createDropdown = (label, options, handleChange) => {
    return (
      <div style={{ width: "256px" }}>
        <select
          className="dropdown"
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">{label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const createInput = (label) => {
    return (
      <div key={label} style={{ position: "relative" }}>
        <label style={{ marginRight: "12px" }}>{label}</label>
        <input
          ref={(el) => (inputRefs.current[label] = el)}
          style={{ width: "226px", borderRadius: "99px" }}
          type="text"
          onFocus={() => {
            setFocusedInput(label);
            const rect = inputRefs.current[label].getBoundingClientRect();
            setInputPosition({
              top: rect.height + 8,
              left: 0,
              width: rect.width,
            });
          }}
          onBlur={() => setFocusedInput(null)}
          onChange={(e) => {
            setInput(e.target.value);
            handleFilterChange(label, e.target.value);
          }}
        />
        {focusedInput === label && (
          <div className="search-container" style={{ ...inputPosition }}>
            <ul className="options-list">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    console.log("Selected option:", option.name); // Debugging statement
                    handleOptionSelect(option.name);
                  }}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const createToggle = (label) => {
    return (
      <div key={label}>
        <label>
          <input
            type="checkbox"
            onChange={(e) => handleFilterChange(label, e.target.checked)}
          />
          {label}
        </label>
      </div>
    );
  };

  const showResults = searchResults !== null;
  useEffect(() => {
    console.log(fetchData(getData.AMENITIES));
    const fetchCountries = async () => {
      try {
        const response = await fetchData(getData.COUNTRIES);
        const countries = JSON.parse(response);
        console.log("Fetched countries:", countries);
        setAllCountries(Array.isArray(countries) ? countries : []);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setAllCountries([]);
      }
    };

    fetchCountries();
  }, []);
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
  const fetchCities = async (countryName) => {
    try {
      const response = await fetchData(getData.CITIES, {
        country: countryName,
      });
      const cities = JSON.parse(response);
      setAllCities(Array.isArray(cities) ? cities : []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setAllCities([]);
    }
  };
  return (
    <div className="filter-sidebar">
      {loading && <LoadingPage />}

      {!loading && !showResults && (
        <div className="filters-container">
          <h2>Find your Destination</h2>

          <div className="dropdown-container">
            {createDropdown(
              "Country Name",
              Array.isArray(allCountries)
                ? allCountries.map((country) => ({
                    label: country.name,
                    value: country.name,
                  }))
                : [],
              (value) => handleFilterChange("country", value) // Handle country change
            )}
            {createDropdown(
              "City Name",
              Array.isArray(allCities)
                ? allCities.map((city) => ({
                    label: city.name,
                    value: city.name,
                  }))
                : [],
              (value) => handleFilterChange("city", value) // Handle city change
            )}
          </div>

          <div className="input-container">
            {createInput("Filter 1  ")}
            {createInput("Filter 2  ")}
            {createInput("Filter 3  ")}
          </div>
        </div>
      )}

      {!loading && !showResults && (
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      )}

      {showResults && (
        <SearchResults
          results={searchResults}
          onButtonClicked={(location) => setSelectedLocation(location)}
          onSearchStop={handleSearchStop}
          onClosePageDetails={handleClosePageDetails}
        />
      )}

      {selectedLocation != null && (
        <PageDetails
          location={selectedLocation}
          onClose={handleClosePageDetails}
        />
      )}

      {selectedLocation == null && (
        <button className="repackButton" onClick={toggleFilters}>
          &lt;
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
