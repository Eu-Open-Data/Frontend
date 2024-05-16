import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
  height: "82vh",
  width: "100%"
};

const defaultCenter = {
  lat: 47.17,
  lng: 27.57
};

function Map() {
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(10);

  const searchLocation = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchText}&key=AIzaSyAu4d-DWWSviutRrLSdMll2JfoFLGY45MI`);
      const { results } = response.data;
      setLocations(results);
      
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({ lat, lng });
        setZoom(13); 
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={searchLocation}>Search</button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyAu4d-DWWSviutRrLSdMll2JfoFLGY45MI">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoom}
          center={mapCenter} 
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: location.geometry.location.lat,
                lng: location.geometry.location.lng,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;