import { useEffect, useState } from 'react';
import type { Meal } from '../types/Meal';
import { getMealsByCategory } from '../services/apiService';
import { useParams } from 'react-router';
import BackButton from '../components/BackButton';
import './../styles/Button.css';
import './../styles/MealsPage.css';
import Spinner from '../components/Spinner';
import MealCard from '../components/MealCard';

function MealsByCategoryPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const { categoryName } = useParams<'categoryName'>();

  useEffect(() => {
    async function fetchMeals() {
      try {
        const { meals } = await getMealsByCategory(categoryName || '');
        setMeals(meals);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (categoryName) {
      void fetchMeals();
    }
  }, [categoryName]);

  function onImageLoad() {
    setLoadedImages((prev) => prev + 1);
  }

  if (isLoading || meals.length < loadedImages) {
    return <Spinner />;
  }

  return (
    <div className="meals-page-container">
      <BackButton />
      <h2>Category: {categoryName}</h2>
      <div className="meals-grid">
        {meals && meals.length > 0 ? (
          meals.map((meal) => <MealCard handleImageLoad={onImageLoad} meal={meal} key={meal.idMeal} />)
        ) : (
          <div>No meals found</div>
        )}
      </div>
    </div>
  );
}

export default MealsByCategoryPage;
