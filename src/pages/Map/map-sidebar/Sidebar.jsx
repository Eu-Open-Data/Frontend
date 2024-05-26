import { useState } from "react";
import "../map-sidebar/Sidebar.css";
import { SidebarData } from "./SidebarData";
import FilterSidebar from "../map-filter-sidebar/FilterSidebar.jsx"; 


function Sidebar() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {
            SidebarData.map((val, key) => (
          <li
            key={key}
            className={`row ${val.className ? val.className : ""}`}
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={() => {
              window.location.pathname = val.link;
            }}
          >
            <div id="icon">{val.icon}</div>
            <div id="title">{val.title}</div>
          </li>
        ))}
      </ul>
      {!showFilters && (
        <button className="unpackButton" onClick={toggleFilters}>
          &gt;
        </button>
      )}
      {showFilters && (
          <div className="filtersSection">
              <FilterSidebar toggleFilters={toggleFilters} />
          </div>
      )}
    </div>
  );
}

export default Sidebar;
