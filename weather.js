import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (city.length > 2) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          setWeather(response.data);
        } catch (error) {
          setWeather(null);
        }
      };
      fetchWeather();
    }
  }, [city, API_KEY]);

  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return <WiDaySunny size={50} />;
    if (description.includes("cloud")) return <WiCloud size={50} />;
    if (description.includes("rain")) return <WiRain size={50} />;
    return <WiCloud size={50} />;
  };

  return (
    <div className="weather-card">
      {weather ? (
        <>
          <h3>{weather.name}, {weather.sys.country}</h3>
          {getWeatherIcon(weather.weather[0].description)}
          <h2>{weather.main.temp}°C</h2>
          <p>{weather.weather[0].description.toUpperCase()}</p>
        </>
      ) : (
        <p>Enter a valid city name</p>
      )}
    </div>
  );
};

export default Weather;
