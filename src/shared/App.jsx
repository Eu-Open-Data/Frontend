import "./App.css";
import MapComponent from "../pages/Map/MapComponent.jsx";
import { LandingPage } from "../pages/Homepage/LandingPage/LandingPage.jsx";

function App() {
  return (
      <div className="App">
        <MapComponent />
        <LandingPage />
      </div>
  );
}

export default App;
