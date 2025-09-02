import { useNavigate } from 'react-router';
import type { Meal } from '../types/Meal';

interface MealCardProps {
  meal: Meal;
  handleImageLoad: () => void;
}

function MealCard({ meal, handleImageLoad }: MealCardProps) {
  const navigate = useNavigate();

  function handleMealClick(mealId: string) {
    void navigate(`/recipe/${mealId}`);
  }
  return (
    <div className="meal-card" key={meal.idMeal} onClick={() => handleMealClick(meal.idMeal)}>
      {meal.strMealThumb && <img onLoad={handleImageLoad} src={meal.strMealThumb} alt={meal.strMeal} />}
      <h3>{meal.strMeal}</h3>
    </div>
  );
}

export default MealCard;
