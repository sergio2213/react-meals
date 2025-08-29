import type { Category } from '../types/Category';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryName: string) => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div style={{ borderStyle: 'solid', margin: '0.3em' }} onClick={() => onClick(category.strCategory.toLowerCase())}>
      <h3>{category.strCategory}</h3>
    </div>
  );
}

export default CategoryCard;
