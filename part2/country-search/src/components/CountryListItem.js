import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryListItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true);
  };
  return (
    <>
      <div>{country.name.common}</div>
      <button onClick={handleClick}>show</button>
      {showDetails && <CountryDetails country={country} />}
    </>
  );
};

export default CountryListItem;
