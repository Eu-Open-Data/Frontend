import MapComponent from "./map/MapComponent.jsx";
import Sidebar from "./map-sidebar/Sidebar.jsx";

function MapPage() {

    return (
        <>
            <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'row-reverse'
            }}>
                <MapComponent/>
                <Sidebar/>
            </div>
        </>
    );
}

export default MapPage;
