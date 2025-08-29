import { useEffect, useState } from 'react';
import type { Meal } from '../types/Meal';
import { getMealsByCategory } from '../services/apiService';
import { useNavigate, useParams } from 'react-router';

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
    <div>
      <h2>Category: {categoryName}</h2>
      {meals && meals.length > 0 ? (
        meals.map((meal) => (
          <div key={meal.idMeal} onClick={() => handleMealClick(meal.idMeal)}>
            <h3>{meal.strMeal}</h3>
          </div>
        ))
      ) : (
        <div>No meals found</div>
      )}
    </div>
  );
}

export default MealsByCategoryPage;
