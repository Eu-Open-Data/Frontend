import MapComponent from "./map/MapComponent.jsx";
import Sidebar from "./map-sidebar/Sidebar.jsx";

function MapPage() {

    return (
        <>
            <div style={{
                width: '100vw', height: '100vh',
                display: 'flex', flexDirection: 'row'
            }}>
                <MapComponent/>
                <Sidebar/>
            </div>
        </>
    );
}

export default MapPage;
