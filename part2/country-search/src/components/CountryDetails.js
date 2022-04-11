const CountryDetails = ({ country }) => {
  console.log(country);
  const languageKeys = Object.keys(country.languages);
  console.log(languageKeys);
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
    </>
  );
};

export default CountryDetails;
