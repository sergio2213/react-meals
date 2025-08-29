import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Recipe } from '../types/Recipe';
import { getRecipeDetails } from '../services/apiService';
import BackButton from '../components/BackButton';
import './../styles/Button.css';
import './../styles/RecipePage.css';
import Spinner from '../components/Spinner';

function RecipeDetailPage() {
  const { mealId } = useParams<'mealId'>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        if (mealId) {
          const { meals } = await getRecipeDetails(mealId);
          setRecipe(meals[0]);
        }
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchRecipe();
  }, [mealId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-detail-container">
      <BackButton />
      <h2>{recipe.strMeal}</h2>
      <p>Category: {recipe.strCategory}</p>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="recipe-info">
        <h3>Ingredients:</h3>
        <ul>
          {Object.keys(recipe).map((key) => {
            if (key.startsWith('strIngredient') && recipe[key]) {
              const ingredient = recipe[key];
              const measure = recipe[`strMeasure${key.slice(13)}`];
              return (
                <li key={key}>
                  {ingredient}: {measure}
                </li>
              );
            }
          })}
        </ul>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <a className="youtube-link" href={recipe.strYoutube} target="_blank">
            Link to video
          </a>
        )}
      </div>
    </div>
  );
}

export default RecipeDetailPage;
