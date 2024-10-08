import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSS ler/mealListStyles.css';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const MealListByCountry: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealsByCountry = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
        setMeals(response.data.meals);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByCountry();
  }, [country]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleMealClick = (mealId: string) => {
    navigate(`/meal/${mealId}`);
  };

  return (
    <div className="list-container">
      <h1>Meals from {country}</h1>
      <div className="flex-wrap">
        {meals.map((meal) => (
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
};

export default MealListByCountry;
