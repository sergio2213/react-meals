import { useEffect, useState } from 'react';
import type { Meal } from '../types/Meal';
import { getMealsByCategory } from '../services/apiService';
import { useNavigate, useParams } from 'react-router';
import BackButton from '../components/BackButton';
import './../styles/Button.css';
import './../styles/MealsPage.css';

function MealsByCategoryPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (isLoading) {
    return <div>Loading meals...</div>;
  }

  return (
    <div className="meals-page-container">
      <BackButton />
      <h2>Category: {categoryName}</h2>
      <div className="meals-grid">
        {meals && meals.length > 0 ? (
          meals.map((meal) => (
            <div className="meal-card" key={meal.idMeal} onClick={() => handleMealClick(meal.idMeal)}>
              {meal.strMealThumb && <img src={meal.strMealThumb} alt={meal.strMeal} />}
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
