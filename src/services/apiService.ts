import type { CategoriesResponse } from '../types/Category';
import type { MealsResponse } from '../types/Meal';
import type { RecipeResponse } from '../types/Recipe';

const BASE_URL: string = 'https://www.themealdb.com/api/json/v1/1';

export async function getCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${BASE_URL}/categories.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return (await response.json()) as CategoriesResponse;
}
// /filter.php?c={category}
export async function getMealsByCategory(category: string): Promise<MealsResponse> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  if (!response) {
    throw new Error('Faile to fetch meals by category');
  }
  return (await response.json()) as MealsResponse;
}

// /lookup.php?i={idMeal}
export async function getRecipeDetails(idMeal: string): Promise<RecipeResponse> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);
  if (!response) {
    throw new Error('Failed to fetch recipe details');
  }
  return (await response.json()) as RecipeResponse;
}
