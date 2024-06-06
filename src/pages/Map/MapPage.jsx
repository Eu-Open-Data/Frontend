import MapComponent from "./map-component/MapComponent.jsx";
import Sidebar from "./map-sidebar/Sidebar.jsx";
import {useState} from "react";

function MapPage() {

    const [locations, setLocations] = useState([]);
    const [map, setMap] = useState(null);

    return (
        <>
            <div style={{
                width: '100vw', height: '100vh',
                display: 'flex', flexDirection: 'row'
            }}>
                <MapComponent locations={locations} onMapLoaded={(map) => setMap(map)}/>
                <Sidebar onLocationsUpdated={(locations) => setLocations(locations)} map={map}/>
            </div>
        </>
    );
}

export default MapPage;
