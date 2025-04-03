import React, { useState } from "react";
import Weather from "./components/weather";
import Forecast from "./components/Forecast";
import "./styles.css";

function App() {
  const [city, setCity] = useState("");

  return (
    <div className="app">
      <h2>🌤️ Weather App</h2>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Weather city={city} />
      <Forecast city={city} />
    </div>
  );
}

export default App;
