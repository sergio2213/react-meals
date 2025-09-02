import { useEffect, useState } from 'react';
import type { Meal } from '../types/Meal';
import { useSearchParams } from 'react-router';
import { searchMealsByName } from '../services/apiService';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import MealCard from '../components/MealCard';

function SearchResultsPage() {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const [searchParams] = useSearchParams();
  const mealName = searchParams.get('name') || '';
  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const { meals } = await searchMealsByName(mealName);
        setMeals(meals || []);
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
            <MealCard handleImageLoad={onImageLoad} meal={meal} key={meal.idMeal} />
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}

export default SearchResultsPage;
