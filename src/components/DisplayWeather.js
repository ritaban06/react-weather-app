import React from "react";
import "./displayweather.css";

function DisplayWeather({ data }) {
  if (!data || typeof data !== 'object') {
    return <div className="displayweather">No weather data available</div>;
  }

  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.weather && data.weather[0] ? data.weather[0].icon : ""}` +
    ".png";

  if (data.cod === "404") {
    return (
      <div className="displayweather">
        <div className="maincard">
          <h2>{data.message || "City not found"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="displayweather">
      <div className="maincard">
        <span className="cardtitle">
          {data.name} , {data.sys?.country}. Weather
        </span>
        <span className="cardsubtitle">
          As of {new Date().toLocaleTimeString()}
        </span>

        <h1>
          {data.main ? `${Math.floor(data.main.temp - 273.15)}°` : "N/A"}
        </h1>
        <span className="weather-main">{data.weather?.[0]?.main || "N/A"}</span>
        {data.weather?.[0]?.icon && (
          <img className="weather-icon" src={iconurl} alt="" />
        )}
        <span className="weather-description">
          {data.weather?.[0]?.description || "N/A"}
        </span>
      </div>

      {data.main && data.wind && data.sys && (
        <div className="weatherdetails">
          <div className="section1">
            <table>
              <tbody>
                <tr>
                  <td><h4>High/Low</h4></td>
                  <td>
                    <span>
                      {Math.floor(data.main.temp_max - 273.15)}/
                      {Math.floor(data.main.temp_min - 273.15)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><h4>Humidity</h4></td>
                  <td><span>{data.main.humidity} %</span></td>
                </tr>
                <tr>
                  <td><h4>Pressure</h4></td>
                  <td><span>{data.main.pressure} hPa</span></td>
                </tr>
                <tr>
                  <td><h4>Visibility</h4></td>
                  <td><span>{(data.visibility / 1000).toFixed(2)} Km</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section2">
            <table>
              <tbody>
                <tr>
                  <td><h4>Wind</h4></td>
                  <td><span>{Math.floor((data.wind.speed * 18) / 5)} km/hr</span></td>
                </tr>
                <tr>
                  <td><h4>Wind Direction</h4></td>
                  <td><span>{data.wind.deg}° deg</span></td>
                </tr>
                <tr>
                  <td><h4>Sunrise</h4></td>
                  <td><span>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span></td>
                </tr>
                <tr>
                  <td><h4>Sunset</h4></td>
                  <td><span>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayWeather;