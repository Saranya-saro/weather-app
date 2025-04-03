import React, { useState, useEffect } from "react";
import axios from "axios";

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (city.length > 2) {
      const fetchForecast = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
          );
          setForecast(response.data.list.slice(0, 5));
        } catch (error) {
          setForecast([]);
        }
      };
      fetchForecast();
    }
  }, [city, API_KEY]);

  return (
    <div className="forecast">
      {forecast.length > 0 && <h3>5-Day Forecast</h3>}
      {forecast.map((day, index) => (
        <div key={index} className="forecast-card">
          <p>{new Date(day.dt_txt).toDateString()}</p>
          <h3>{day.main.temp}°C</h3>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
