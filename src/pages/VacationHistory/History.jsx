import { useState, useEffect } from 'react';
import './History.css';

const History = () => {
  const [vacations, setVacations] = useState([
    {
      city: 'City Name 1',
      country: 'Country 1',
      startDate: 'dd-mm-yyyy',
      endDate: 'dd-mm-yyyy',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      city: 'City Name 2',
      country: 'Country 2',
      startDate: 'dd-mm-yyyy',
      endDate: 'dd-mm-yyyy',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      city: 'City Name 3',
      country: 'Country 3',
      startDate: 'dd-mm-yyyy',
      endDate: 'dd-mm-yyyy',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      city: 'City Name 4',
      country: 'Country 4',
      startDate: 'dd-mm-yyyy',
      endDate: 'dd-mm-yyyy',
      imageUrl: 'https://via.placeholder.com/50',
    },
  ]);

  const addVacation = (vacation) => {
    setVacations((prevVacations) => [...prevVacations, vacation]);
  };

  useEffect(() => {
    // Simulez adaugarea dinamica a unor vacante noi 
    const newVacations = [
      {
        city: 'City Name 5',
        country: 'Country 5',
        startDate: 'dd-mm-yyyy',
        endDate: 'dd-mm-yyyy',
        imageUrl: 'https://via.placeholder.com/50',
      },
      {
        city: 'City Name 6',
        country: 'Country 6',
        startDate: 'dd-mm-yyyy',
        endDate: 'dd-mm-yyyy',
        imageUrl: 'https://via.placeholder.com/50',
      },
      
    ];

    newVacations.forEach((vacation) => addVacation(vacation));
  }, []);

  return (
    <div className="vacation-history-container">
      <h2>Vacation History</h2>
      <div className="vacation-cards">
        {vacations.map((vacation, index) => (
          <div key={index} className="vacation-card">
            <div className="image-container">
              <img src={vacation.imageUrl} alt={`${vacation.city} ${vacation.country}`} />
            </div>
            <div className="vacation-info">
              <div className="city-name">{vacation.city}</div>
              <div className="country">{vacation.country}</div>
              <div className="date-range">{`${vacation.startDate} - ${vacation.endDate}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
