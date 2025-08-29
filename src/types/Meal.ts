export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealsResponse = {
  meals: Meal[];
};
