import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    countryService
      .getAll()
      .then((countriesData) => {
        setCountries(countriesData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
        setError("Failed to load country data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // Filter countries based on search input
  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  // Handle country selection
  const handleShowCountry = (countryName) => {
    const country = filteredCountries.find(
      (c) => c.name.common === countryName
    );
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Info</h1>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      {isLoading ? (
        <p>Loading countries...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList
          countries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      )}
    </div>
  );
};

export default App;
