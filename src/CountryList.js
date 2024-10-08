import React, { useEffect, useState } from 'react';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(''); 
  const [selectedCountry, setSelectedCountry] = useState(null); 

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error('Veri çekme hatası:', error));
  }, []);

  const filteredCountries = countries.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion === '' || country.region === selectedRegion)
    );
  });

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseDetails = () => {
    setSelectedCountry(null);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div>
      {}
      <div
        style={{
          backgroundColor: '#fff', 
          padding: '10px 20px', 
          marginBottom: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          textAlign: 'left', 
        }}
      >
        <h1 style={{ margin: 4 }}>Where in the world?</h1>
      </div>

      {}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', marginBottom: '20px', width: '25%' }}
        />

        {}
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          style={{
            padding: '10px',
            marginBottom: '20px',
            width: '20%',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        >
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            onClick={() => handleCountryClick(country)} 
            style={{
              width: '150px', 
              height: 'auto', 
              border: '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              boxSizing: 'border-box',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              cursor: 'pointer', 
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'; 
            }}
          >
            {}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                style={{ width: '80px', height: 'auto' }}
              />
            </div>
            {}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',color: '#4682B4' }}>
              <span style={{ textAlign: 'center', fontWeight: 'bold' }}>{country.name.common}</span>
              {}
              <span style={{ textAlign: 'center', fontSize: '12px', color: '#4682B4' }}>
                Population: {country.population.toLocaleString()}
              </span>
              <span style={{ textAlign: 'center', fontSize: '12px', color: '#4682B4' }}>
                Region: {country.region}
              </span>
              <span style={{ textAlign: 'center', fontSize: '12px', color: '#4682B4' }}>
                Capital: {country.capital ? country.capital[0] : 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {}
      {selectedCountry && (
        <div
          style={{
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, 
          }}
        >
          <div
            style={{
              backgroundColor: '#fff', 
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              width: '400px',
            }}
          >
            <h2> Republic of {selectedCountry.name.common}</h2>
            <img
              src={selectedCountry.flags.png}
              alt={`${selectedCountry.name.common} flag`}
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
            />
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <p><strong>Sub Region:</strong> {selectedCountry.subregion}</p>
            <p><strong>Population:</strong> {selectedCountry.population}</p>
            <p><strong>Area:</strong> {selectedCountry.area} km²</p>
            <button onClick={handleCloseDetails} style={{ marginTop: '10px' }}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryList;
