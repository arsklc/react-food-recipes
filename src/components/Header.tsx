import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS ler/Header.css';

const Header: React.FC = () => {
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [mealSearchTerm, setMealSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleIngredientSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredientSearchTerm.trim() !== '') {
      navigate(`/search/${ingredientSearchTerm}`);
    }
  };

  const handleMealSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mealSearchTerm.trim() !== '') {
      navigate(`/search/meal/${mealSearchTerm}`);
    }
  };

  const handleRandomMeal = () => {
    navigate('/random-meal', { replace: true });
  };

  return (
    <header>
      <nav>
        <Link to="/">List by Category</Link>
        <Link to="/country">List by Country</Link>

        <form onSubmit={handleIngredientSearch}>
          <input
            type="text"
            placeholder="Search by ingredient..."
            value={ingredientSearchTerm}
            onChange={(e) => setIngredientSearchTerm(e.target.value)}
          />
        </form>

        <form onSubmit={handleMealSearch}>
          <input
            type="text"
            placeholder="Search by meal name..."
            value={mealSearchTerm}
            onChange={(e) => setMealSearchTerm(e.target.value)}
          />
        </form>

        <button onClick={handleRandomMeal}>
          Random Meal
        </button>
      </nav>
    </header>
  );
};

export default Header;
