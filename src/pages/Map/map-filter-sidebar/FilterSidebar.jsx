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
import axios from "axios";
const FilterSidebar = ({ toggleFilters, onLocationsUpdated, map }) => {
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
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

  const google = window.google;

  //FILTERS
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(20);
  const [minRating, setMinRating] = useState(0.0);
  const [minRatingLocation, setMinRatingLocation] = useState(0.0);
  const [minRatingService, setMinRatingService] = useState(0.0);
  const [minRatingSleep, setMinRatingSleep] = useState(0.0);
  const [minRatingCleanliness, setMinRatingCleanliness] = useState(0.0);

  const API_KEY = "AIzaSyAu4d-DWWSviutRrLSdMll2JfoFLGY45MI";

  const inputRefs = useRef({});
  const [locationsData, setLocationsData] = useState([]);
  const locationsDataDEMO = [
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
      reviews: [
        { author: "User 1", rating: 5, content: "Review foarte bun." },
        { author: "User 2", rating: 4, content: "Review bun." },
        { author: "User 3", rating: 3, content: "Review mediu." },
      ],
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
      reviews: [
        { author: "User 1", rating: 5, content: "Review foarte bun." },
        { author: "User 2", rating: 4, content: "Review bun." },
        { author: "User 3", rating: 3, content: "Review mediu." },
      ],
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
      reviews: [
        { author: "User 1", rating: 5, content: "Review foarte bun." },
        { author: "User 2", rating: 4, content: "Review bun." },
        { author: "User 3", rating: 3, content: "Review mediu." },
      ],
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
      reviews: [
        { author: "User 1", rating: 5, content: "Review foarte bun." },
        { author: "User 2", rating: 4, content: "Review bun." },
        { author: "User 3", rating: 3, content: "Review mediu." },
        { author: "User 1", rating: 5, content: "Review foarte bun." },
        { author: "User 2", rating: 4, content: "Review bun." },
        { author: "User 3", rating: 3, content: "Review mediu." },
      ],
    },
  ];
  useEffect(() => {
    console.log(input);
  }, [input]);
  const handleInput = () => {
    setOptions(
      amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };
  const handleOptionSelect = (selectedOption) => {
    setInput(selectedOption);
    updateActiveFilters(focusedInput, selectedOption);
    console.log(activeFilters);
  };
  const updateActiveFilters = (filterName, value) => {
    setActiveFilters((prevFilters) => {
      const newFilters = prevFilters.filter(
        (filter) => filter.name !== filterName
      );
      if (value) {
        newFilters.push({ name: filterName, value });
      }
      return newFilters;
    });
  };
  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    handleInput();
  }, [input, amenities]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    if (filterName === "city") setCity(value);
    if (filterName === "country") {
      setCountry(value);
      setCountrySelected(value);
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
    const requestBody = {
      token: sessionStorage.getItem("token"),
      search_phrase: searchInput,
      min_rating: minRating,
      countries: country,
      cities: city,
      min_rating_cleanliness: minRatingCleanliness,
      min_rating_service: minRatingService,
      min_rating_location: minRatingLocation,
      min_rating_sleep: minRatingSleep,
      max_count: 20
    };

    try {
      //await new Promise((resolve) => setTimeout(resolve, 2000));

      fetchData(getData.SEARCH, requestBody).then((res) => {
        let results = JSON.parse(res);
        let promises = [];
        results.forEach((x) => {
          let service = new google.maps.places.PlacesService(map);

          promises.push(new Promise((resolve, reject) => {
            service.findPlaceFromQuery({
              query: x.name + " " + x.address,
              fields: ['place_id', 'photos'],
            }, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (!results || !results[0].photos) {
                  resolve(null); // Resolve with null if no results or no photos
                } else {
                  x.photo = results[0].photos[0].getUrl();
                  resolve(x);
                }
              } else {
                reject(`PlacesServiceStatus not OK: ${status}`);
              }
            });
          }).catch(error => {
            console.error(`Error fetching place data for ${x.name}: ${error}`);
          }));
        });

        Promise.allSettled(promises).then((results) => {
          results = results.map(x => x.value);
          setSearchResults(results);
          setLoading(false);
        })

      });
        }
      catch (error) {
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
  const createSearchInput = (label) => {
    return (
      <div key={label} style={{ position: "relative" }}>
        <label style={{ marginRight: "12px" }}>{label}</label>
        <input
          ref={(el) => (inputRefs.current[label] = el)}
          style={{ width: "226px", borderRadius: "99px" }}
          type="text"
          value={searchInput || ""}
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
            setSearchInput(e.target.value);
          }}
        />
      </div>
    );
  };
  const createInput = (label, type, set, value) => {
    return (
      <div key={label} style={{ position: "relative" }}>
        <label style={{ marginRight: "12px" }}>{label}</label>
        <input
          ref={(el) => (inputRefs.current[label] = el)}
          style={{ width: "226px", borderRadius: "99px" }}
          type={type}
          value={value || ""}
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
            set(e.target.value);
            handleFilterChange(label, e.target.value);
          }}
        />
      </div>
    );
  };
  const createAmenityInput = (label, type) => {
    return (
      <div key={label} style={{ position: "relative" }}>
        <label style={{ marginRight: "12px" }}>{label}</label>
        <input
          ref={(el) => (inputRefs.current[label] = el)}
          style={{ width: "226px", borderRadius: "99px" }}
          type={type}
          value={amenities || ""}
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
            setAmenities(e.target.value);
            handleFilterChange(label, e.target.value);
          }}
        />
        {focusedInput === label && (
          <div className="search-container" style={{ ...inputPosition }}>
            <ul className="options-list">
              {options.map((option, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    handleOptionSelect(option.name);
                    handleFilterChange(label, option.name);
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
      <div className="filter-sidebar-container">
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
                  {createSearchInput("Search for:  ")}
                  {createInput(
                      "Overall Rating:  ",
                      "number",
                      setMinRating,
                      minRating
                  )}

                  {createInput(
                      "Location Rating: ",
                      "number",
                      setMinRatingLocation,
                      minRatingLocation
                  )}
                  {createInput(
                      "Service Rating: ",
                      "number",
                      setMinRatingService,
                      minRatingService
                  )}
                  {createInput(
                      "Cleanliness Rating: ",
                      "number",
                      setMinRatingCleanliness,
                      minRatingCleanliness
                  )}
                  {createInput(
                      "Sleep Rating: ",
                      "number",
                      setMinRatingSleep,
                      minRatingSleep
                  )}

                  {createInput("Amenity:  ", "text", null, null)}
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
        </div>
        {selectedLocation == null && (
            <button className="repackButton" onClick={toggleFilters}>
              &lt;
            </button>
        )}
      </div>
  );
};

export default FilterSidebar;
