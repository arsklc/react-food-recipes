import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesList from './pages/CategoryPages/CategoriesList';
import CountryList from './pages/CountryPages/CountryList';
import MealListByCountry from './pages/CountryPages/MealListByCountry';
import MealDetail from './pages/MealDetail';
import SearchResultsByIngredient from './components/SearchResultsByIngredient';
import Header from './components/Header';
import RandomMeal from './components/RandomMeal';
import MealsList from './pages/CategoryPages/MealsList';
import SearchMealByName from './components/SearchMealByName';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="background">
        <Header />
        <Routes>
          <Route path="/" element={<CategoriesList />} />
          <Route path="/country" element={<CountryList />} />
          <Route path="/meals-by-country/:country" element={<MealListByCountry />} />
          <Route path="/meal/:mealId" element={<MealDetail />} />
          <Route path="/search/:ingredient" element={<SearchResultsByIngredient />} />
          <Route path="/search/meal/:mealName" element={<SearchMealByName />} />
          <Route path="/random-meal" element={<RandomMeal />} />
          <Route path="/category/:categoryName" element={<MealsList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
