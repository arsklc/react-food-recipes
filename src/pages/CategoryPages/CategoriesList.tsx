import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSS ler/listStyles.css';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('error', error);
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="list-container">
      <div className="flex-wrap">
        {categories.map(category => (
          <div  
            key={category.idCategory}
            className="list-item"
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <img src={category.strCategoryThumb} className="category-image" alt={category.strCategory} />
            <h3>{category.strCategory}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
