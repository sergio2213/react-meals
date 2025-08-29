import { useEffect, useState } from 'react';
import type { Category } from '../types/Category';
import { getCategories } from '../services/apiService';
import CategoryCard from '../components/CategoryCard';
import { useNavigate } from 'react-router';

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { categories } = await getCategories();
        setCategories(categories);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(fetchCategories, 200);
  }, []);

  function handleCategoryClick(categoryName: string) {
    void navigate(`/category/${categoryName}`);
  }

  if (isLoading) {
    return <div>Loading categories...</div>;
  }
  const categoriesList = categories.map((category) => {
    return <CategoryCard key={category.idCategory} category={category} onClick={handleCategoryClick} />;
  });
  return (
    <div>
      <h2>Categories</h2>
      {categoriesList}
    </div>
  );
}

export default HomePage;
