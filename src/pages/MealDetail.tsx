import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS ler/MealDetail.css';

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags: string;
  strYoutube: string;
  ingredients: { ingredient: string; measure: string }[];
}

const MealDetail: React.FC = () => {
  const { mealId } = useParams<{ mealId: string }>();
  const [mealDetail, setMealDetail] = useState<MealDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mealId) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => {
          const meal = response.data.meals[0];
          const ingredients = Array.from({ length: 20 }, (_, i) => ({
            ingredient: meal[`strIngredient${i + 1}`],
            measure: meal[`strMeasure${i + 1}`],
          }))
            .filter((item) => item.ingredient && item.ingredient.trim())
            .map((item) => ({
              ingredient: item.ingredient,
              measure: item.measure,
            }));
          setMealDetail({ ...meal, ingredients });
        })
        .catch((error) => {
          console.error('error', error);
        });
    }
  }, [mealId]);

  if (!mealDetail) {
    return <div>Loading...</div>;
  }

  const handleAreaClick = () => {
    navigate(`/meals-by-country/${mealDetail.strArea}`);
  };

  const handleCategoryClick = () => {
    navigate(`/category/${mealDetail.strCategory}`);
  };

  return (
    <div className="meal-detail">
      <h2>{mealDetail.strMeal}</h2>
      <div className="meal-detail-content">
        <img src={mealDetail.strMealThumb} alt={mealDetail.strMeal} />
        <div className="ingredients-list">
          <ul>
            {mealDetail.ingredients.map((item, index) => (
              <li key={index}>
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p>
        <strong>Category:</strong>{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer', marginRight:'10px' }}
          onClick={handleCategoryClick}
        >
          {mealDetail.strCategory}
        </span>

        <strong>Area:</strong>{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={handleAreaClick}
        >
          {mealDetail.strArea}
        </span>
      </p>
      <p>
        
      </p>
      <p>
        <strong>Instructions:</strong> {mealDetail.strInstructions}
      </p>
      {mealDetail.strTags && <p><strong>Tags:</strong> {mealDetail.strTags}</p>}
      {mealDetail.strYoutube && (
        <a
          href={mealDetail.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
};

export default MealDetail;
