import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSS ler/mealListStyles.css';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const MealsList: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then(response => {
          setMeals(response.data.meals);
        })
        .catch(error => {
          console.error('error', error);
        });
    }
  }, [categoryName]);

  const handleMealClick = (mealId: string) => {
    navigate(`/meal/${mealId}`);
  };

  return (
    <div className="list-container">
      <h2>{categoryName} Meals</h2>
      <div className="flex-wrap">
        {meals.map(meal => (
          <div
            key={meal.idMeal}
            className="meal-item"
            onClick={() => handleMealClick(meal.idMeal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealsList;
