import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../Map.css";
import { ContentWrapper } from "../../Miscellaneous/ContentWrapper";

const mapStyles = {
  height: "100%",
  width: "100%"
};

const defaultCenter = {
  lat: 47.17,
  lng: 27.57,
};

function getBoundsZoomLevel(bounds, mapDim) {
  let WORLD_DIM = { height: 256, width: 256 };
  let ZOOM_MAX = 21;

  function latRad(lat) {
    let sin = Math.sin(lat * Math.PI / 180);
    let radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  let ne = bounds.getNorthEast();
  let sw = bounds.getSouthWest();

  let latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

  let lngDiff = ne.lng() - sw.lng();
  let lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  let latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  let lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

function Map({locations, onMapLoaded}) {
  let mapCenter = defaultCenter;
  let zoom = 10;

  const google = window.google;

  if(locations.length !== 0)
  {
    let center = {
      lat: 0,
      lng: 0
    };

    let bounds = new google.maps.LatLngBounds();
    locations.forEach(x => {
      center.lat += x.geometry.location.lat;
      center.lng += x.geometry.location.lng;

      bounds.extend({
        lat: x.geometry.location.lat,
        lng: x.geometry.location.lng
      })
    });

    center.lat /= locations.length;
    center.lng /= locations.length;

    let $mapDiv = document.getElementById('#map-container');
    let mapDim = { height: $mapDiv.height(), width: $mapDiv.width() };

    zoom = getBoundsZoomLevel(bounds, mapDim);
  }

  return (
    <>
      <ContentWrapper type="vertical">
        <div
            id={"map-container"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="map-container"
        >
          <LoadScript googleMapsApiKey="AIzaSyAu4d-DWWSviutRrLSdMll2JfoFLGY45MI" libraries={['places']}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={zoom}
              onLoad={map => onMapLoaded(map)}
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
      </ContentWrapper>
    </>
  );
}

export default Map;
