import { categories } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-4">
      <h2 className="text-lg font-bold mb-3">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => navigate(`/products?category=${category.id}`)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 animate-fade-up stagger-${index + 1}`}
            style={{ opacity: 0 }}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs font-medium text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
