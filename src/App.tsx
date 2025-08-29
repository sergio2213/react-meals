import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import MealsByCategoryPage from './pages/MealsByCategoryPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<MealsByCategoryPage />} />
        <Route path="/recipe/:mealId" element={<RecipeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
