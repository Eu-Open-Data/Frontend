import React from "react";
import LoadingPage from "./LoadingPage";
import SearchResults from "./SearchResults";
import "./FilterSidebar.css";
import PageDetails from "./PageDetails.jsx";
/* eslint-disable react/prop-types */

class FilterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      loading: false,
      searchResults: null,
      locationsData: [
        { 
          id: 1, 
          name: 'Hotel Confort',
          type: 'Hotel', 
          address: 'Strada Lalelelor, Nr. 15', 
          rating: 4.2,
          votes: 1405,
          openHours: '08:00',
          closeHours: '22:00',
          imageUrl: "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
          description: 'A', 
          amenities: ['Piscină', 'Restaurant', 'Saună', 'Parcare gratuită'],
          phone: '+40 123 456 789',
          website: 'https://www.hotelconfort.ro'
        },
        { 
          id: 2, 
          name: 'Pensiunea Bucovina',
          type: 'Pensiune', 
          address: 'Strada Principala, Nr. 22', 
          rating: 3.8,
          votes: 980,
          openHours: '08:00',
          closeHours: '22:00',
          imageUrl: "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
          description: 'B', 
          amenities: ['Piscină', 'Restaurant', 'Saună', 'Parcare gratuită'],
          phone: '+40 123 456 789',
          website: 'https://www.hotelconfort.ro'
        },
        { 
          id: 3, 
          name: 'Cabana La Munte',
          type: 'Cabana', 
          address: 'Strada Padurii, Nr. 10', 
          rating: 4.7,
          votes: 2003,
          openHours: '08:00',
          closeHours: '22:00',
          imageUrl: "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
          description: 'C', 
          amenities: ['Piscină', 'Restaurant', 'Saună', 'Parcare gratuită'],
          phone: '+40 123 456 789',
          website: 'https://www.hotelconfort.ro'
        },
        { 
          id: 4, 
          name: 'Vila Maria',
          type: 'Vila', 
          address: 'Strada Florilor, Nr. 8', 
          rating: 4.0,
          votes: 850,
          openHours: '08:00',
          closeHours: '22:00',
          imageUrl: "https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg",
          description: 'D', 
          amenities: ['Piscină', 'Restaurant', 'Saună', 'Parcare gratuită'],
          phone: '+40 123 456 789',
          website: 'https://www.hotelconfort.ro'
        },
      ],
      selectedLocation: null,
      countrySelected: false, // Adăugăm countrySelected
    };
  }

  handleFilterChange = (filterName, value) => {
    // Verificăm dacă filtrul este pentru țară și actualizăm countrySelected în consecință
    if (filterName === "") {
      this.setState({ countrySelected: !!value });
    }
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [filterName]: value,
      },
    }));
  };

  handleClosePageDetails = () => {
    this.setState({ selectedLocation: null }); 
  };

  handleSearchStop = () => {
    this.setState({ searchResults: null, selectedLocation: null }); // Resetăm și selectedLocation
  };

  handleSearch = async () => {
    this.setState({ loading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const filters = this.state.filters;
      let filteredResults = [...this.state.locationsData];

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

      // Alte filtre...

      this.setState({ searchResults: filteredResults, loading: false });
    } catch (error) {
      console.error("Eroare la simulare filtrare:", error);
      this.setState({ loading: false });
    }
  };

  createDropdown = (label, options) => {
    return (
      <div style={{ width: "256px" }}>
        <select
          className="dropdown"
          onChange={(e) => this.handleFilterChange(label, e.target.value)}
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

  createInput = (label) => {
    return (
      <div key={label}>
        <label style={{ marginRight: "12px" }}>{label}</label>
        <input
          style={{ width: "226px", borderRadius: "99px" }}
          type="text"
          onChange={(e) => this.handleFilterChange(label, e.target.value)}
        />
      </div>
    );
  };

  createToggle = (label) => {
    return (
      <div key={label}>
        <label>
          <input
            type="checkbox"
            onChange={(e) => this.handleFilterChange(label, e.target.checked)}
          />
          {label}
        </label>
      </div>
    );
  };

  render() {
    const { loading, searchResults, selectedLocation } = this.state;
    const showResults = searchResults !== null;

    return (
      <div className="filter-sidebar">
        {loading && <LoadingPage />}

        {!loading && !showResults && (
          <div className="filters-container">
            <h2>Find your Destination</h2>

            <div className="dropdown-container">
              {this.createDropdown("Country Name", [
                { label: "Option 1", value: "Option 1" },
                { label: "Option 2", value: "Option 2" },
                { label: "Option 3", value: "Option 3" },
              ])}
              {this.createDropdown("City Name", [
                { label: "Option A", value: "Option A" },
                { label: "Option B", value: "Option B" },
                { label: "Option C", value: "Option C" },
              ])}
            </div>

            <div className="input-container">
              {this.createInput("Filter 1  ")}
              {this.createInput("Filter 2  ")}
              {this.createInput("Filter 3  ")}
            </div>

            <div className="toggle-container">
              <div className="toggle-group">
                {this.createToggle("Extra 1")}
                {this.createToggle("Extra 2")}
                {this.createToggle("Extra 3")}
              </div>
              <div className="toggle-group">
                {this.createToggle("Extra 4")}
                {this.createToggle("Extra 5")}
                {this.createToggle("Extra 6")}
              </div>
            </div>
          </div>
        )}

        {!loading && !showResults && (
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        )}

{showResults && (
    <SearchResults 
      results={searchResults} 
      onButtonClicked={(location) => this.setState({ selectedLocation: location })}
      onSearchStop={this.handleSearchStop}
      onClosePageDetails={this.handleClosePageDetails} // Transmitem handleClosePageDetails
    />
  )}

  {selectedLocation != null && (
    <PageDetails 
      location={selectedLocation} 
      onClose={this.handleClosePageDetails} // Transmitem handleClosePageDetails
    />
  )}
        {selectedLocation == null && (
          <button className="repackButton" onClick={this.props.toggleFilters}>
            &lt;
          </button>
        )}
      </div>
    );
  }
}

export default FilterSidebar;
