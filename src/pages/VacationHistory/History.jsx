import { useState } from 'react';
import './History.css';
import '../Map/map-filter-sidebar/LoadingPage.css';
import axios from "axios";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import {useNavigate} from "react-router-dom";

/* global google */

const History = () => {
  const [vacations, setVacations] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  if(!sessionStorage.getItem("token"))
      navigate('/login');

  return (
    <div className="vacation-history-container">
      <h2>Vacation History</h2>
        <div style={{display: 'none'}}>
            <LoadScript googleMapsApiKey="AIzaSyAu4d-DWWSviutRrLSdMll2JfoFLGY45MI" libraries={['places']}>
                <GoogleMap onLoad={map => {
                    let service = new google.maps.places.PlacesService(map);

                    axios.get(`http://54.167.96.255:5000/get_history?token=${sessionStorage.getItem("token")}`).then(r => {
                        let promises = [];
                        r.data.reverse().forEach((x) => {

                            promises.push(new Promise((resolve, reject) => {
                                service.findPlaceFromQuery({
                                    query: x.hotel.name + " " + x.hotel.address,
                                    fields: ['place_id', 'photos'],
                                }, (results, status) => {
                                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                                        if (!results || !results[0].photos) {
                                            resolve(""); // Resolve with null if no results or no photos
                                        } else {
                                            x.photo = results[0].photos[0].getUrl();
                                            if(x.photo == null)
                                                x.photo = "";
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
                            setVacations(results);
                            setLoading(false);
                        })
                    });
                }}>
                </GoogleMap>
            </LoadScript>
        </div>
        {
            loading ? <div style={{width: '100%', display: 'flex', alignContent: 'center'}}><div className="loader"></div></div> :       <div className="vacation-cards">
                {vacations.map((vacation, index) => (
                    <div key={index} className="vacation-card">
                        <div className="image-container">
                            <img src={vacation.photo ?? ""} />
                        </div>
                        <div className="vacation-info">
                            <div className="city-name">{vacation.hotel.name}</div>
                            <div className="date-range">{vacation.timestamp}</div>
                        </div>
                    </div>
                ))}
            </div>
        }
    </div>
  );
};

export default History;
