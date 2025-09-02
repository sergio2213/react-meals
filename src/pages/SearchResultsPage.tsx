import { useEffect, useState } from 'react';
import type { Meal } from '../types/Meal';
import { useNavigate, useSearchParams } from 'react-router';
import { searchMealsByName } from '../services/apiService';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function SearchResultsPage() {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const [searchParams] = useSearchParams();
  const mealName = searchParams.get('name') || '';
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const { meals } = await searchMealsByName(mealName);
        setMeals(meals || []); // revisar luego
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (mealName) {
      void fetchSearchResults();
    }
  }, [mealName]);

  function handleMealClick(mealId: string) {
    void navigate(`/recipe/${mealId}`);
  }

  function onImageLoad() {
    setLoadedImages((prev) => prev + 1);
  }

  if (isLoading || (meals && meals.length < loadedImages)) {
    return <Spinner />;
  }

  return (
    <div className="meals-page-container">
      <BackButton />
      <h2>Results for {mealName}</h2>

      {meals && meals.length > 0 ? (
        <div className="meals-grid">
          {meals.map((meal) => (
            <div className="meal-card" key={meal.idMeal} onClick={() => handleMealClick(meal.idMeal)}>
              {meal.strMealThumb && <img onLoad={onImageLoad} src={meal.strMealThumb} alt={meal.strMeal} />}
              <h3>{meal.strMeal}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}

export default SearchResultsPage;
