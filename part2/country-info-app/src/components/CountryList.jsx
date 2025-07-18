const CountryList = ({ countries, onShowCountry }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {countries.map(country => (
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={() => onShowCountry(country.name.common)}>
          show
        </button>
      </li>
    ))}
  </ul>
);

export default CountryList;