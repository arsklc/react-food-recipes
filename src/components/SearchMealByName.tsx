import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS ler/mealListStyles.css';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const SearchMealByName: React.FC = () => {
  const { mealName } = useParams<{ mealName: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mealName) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => {
          setMeals(response.data.meals);
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [mealName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (meals.length === 0) {
    return <p>No meals found for "{mealName}".</p>;
  }

  return (
    <div className="list-container">
      <h2>Meals with "{mealName}"</h2>
      <div className="flex-wrap">
        {meals.map(meal => (
          <div
            key={meal.idMeal}
            className="meal-item"
            onClick={() => window.location.href = `/meal/${meal.idMeal}`}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMealByName;
