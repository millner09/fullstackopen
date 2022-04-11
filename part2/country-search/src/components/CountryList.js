import CountryDetails from "./CountryDetails";
import CountryListItem from "./CountryListItem";

const CountryList = ({ countries }) => {
  return (
    <>
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {countries.length <= 10 &&
        countries.length > 1 &&
        countries.map((country, i) => (
          <CountryListItem key={i} country={country} />
        ))}

      {countries.length === 1 && <CountryDetails country={countries[0]} />}
    </>
  );
};

export default CountryList;
