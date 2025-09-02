import { useEffect, useState } from 'react';
import type { Category } from '../types/Category';
import { getCategories, getRandomMeal } from '../services/apiService';
import CategoryCard from '../components/CategoryCard';
import { useNavigate } from 'react-router';
import './../styles/HomePage.css';
import './../styles/SearchBar.css';
import './../styles/RandomButton.css';
import Spinner from '../components/Spinner';

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { categories } = await getCategories();
        setCategories(categories);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(fetchCategories, 200);
  }, []);

  function handleCategoryClick(categoryName: string) {
    void navigate(`/category/${categoryName}`);
  }

  async function handleRandomMeal() {
    try {
      const { meals } = await getRandomMeal();
      const randomMeal = meals[0];
      if (randomMeal && randomMeal.idMeal) {
        void navigate(`/recipe/${randomMeal.idMeal}`);
      } else {
        console.log('No se pudo obtener la receta aleatoria');
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  function handleSearch() {
    if (searchTerm) {
      void navigate(`/search?name=${searchTerm}`);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }
  const categoriesList = categories.map((category) => {
    return <CategoryCard key={category.idCategory} category={category} onClick={handleCategoryClick} />;
  });
  return (
    <div className="home-page-container">
      <h2>Categories</h2>
      <div className="search-bar">
        <input
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="Find a recipe"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button onClick={() => void handleRandomMeal()} className="random-button">
        Random recipe
      </button>
      <div className="categories-grid">{categoriesList}</div>
    </div>
  );
}

export default HomePage;
