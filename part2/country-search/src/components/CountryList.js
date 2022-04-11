import CountryDetails from "./CountryDetails";

const CountryList = ({ countries }) => {
  return (
    <>
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {countries.length <= 10 &&
        countries.length > 1 &&
        countries.map((country, i) => <p key={i}>{country.name.common}</p>)}

      {countries.length === 1 && <CountryDetails country={countries[0]} />}
    </>
  );
};

export default CountryList;
