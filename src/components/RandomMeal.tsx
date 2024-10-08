import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RandomMeal: React.FC = () => {
  const navigate = useNavigate();

  const fetchRandomMeal = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => {
        const mealId = response.data.meals[0].idMeal;
        navigate(`/meal/${mealId}`);
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return <div>Loading random meal...</div>;
};

export default RandomMeal;
