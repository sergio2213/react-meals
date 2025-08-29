import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Recipe } from '../types/Recipe';
import { getRecipeDetails } from '../services/apiService';

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
    return <div>Loading recipe...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      <small>Category: {recipe.strCategory}</small>
      <div>
        <span>Ingredients:</span>
        <ul>
          {Object.keys(recipe).map((key) => {
            if (key.startsWith('strIngredient') && recipe[key]) {
              const ingredient = recipe[key];
              const measure = recipe[`strMeasure${key.slice(13)}`];
              return (
                <li>
                  {ingredient}: {measure}
                </li>
              );
            }
          })}
        </ul>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <a href={recipe.strYoutube} target="_blank">
            Link to video
          </a>
        )}
      </div>
    </div>
  );
}

export default RecipeDetailPage;
