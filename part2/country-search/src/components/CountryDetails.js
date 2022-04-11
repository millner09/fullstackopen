import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({});
  const languageKeys = Object.keys(country.languages);
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(country.latlng);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=imperial`
        );
        setWeather(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  console.log(weather);
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h4>Languages</h4>
      <ul>
        {languageKeys.map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperatire {weather.main.temp} Fahrenheit</div>
      <div>wind {weather.wind.speed} miles/hr</div>
    </>
  );
};

export default CountryDetails;
