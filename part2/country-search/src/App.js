import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountires] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data...");
      const res = await axios.get("https://restcountries.com/v3.1/all");
      console.log(res);

      setCountires(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tempCountries = countries.filter((country) =>
      country.name.common.includes(filterText)
    );

    setFilteredCountries(tempCountries);
  }, [filterText, countries]);

  return (
    <>
      <h1>App</h1>
      <Filter filterText={filterText} setFilterText={setFilterText} />
      <CountryList countries={filteredCountries} />
    </>
  );
}

export default App;
