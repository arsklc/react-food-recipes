import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS ler/listStyles.css'

interface Country {
  strArea: string;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();
        setCountries(data.meals);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleCountryClick = (country: string) => {
    navigate(`/meals-by-country/${country}`);
  };

  return (
    <div className="list-container">
      <h1>Country List</h1>
      <div className="flex-wrap">
        {countries.map((country, index) => (
          <div
            key={index}
            className="list-item"
            onClick={() => handleCountryClick(country.strArea)}
          >
            {country.strArea}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
