import { useEffect, useState } from 'react';
import type { Meal } from '../types/Meal';
import { getMealsByCategory } from '../services/apiService';
import { useNavigate, useParams } from 'react-router';
import BackButton from '../components/BackButton';
import './../styles/Button.css';
import './../styles/MealsPage.css';
import Spinner from '../components/Spinner';

function MealsByCategoryPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const { categoryName } = useParams<'categoryName'>();
  const navigate = useNavigate();

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

  function handleMealClick(mealId: string) {
    void navigate(`/recipe/${mealId}`);
  }

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
          meals.map((meal) => (
            <div className="meal-card" key={meal.idMeal} onClick={() => handleMealClick(meal.idMeal)}>
              {meal.strMealThumb && <img onLoad={onImageLoad} src={meal.strMealThumb} alt={meal.strMeal} />}
              <h3>{meal.strMeal}</h3>
            </div>
          ))
        ) : (
          <div>No meals found</div>
        )}
      </div>
    </div>
  );
}

export default MealsByCategoryPage;
