import type { Category } from '../types/Category';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryName: string) => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div className="category-card" onClick={() => onClick(category.strCategory.toLowerCase())}>
      <h3>{category.strCategory}</h3>
    </div>
  );
}

export default CategoryCard;
