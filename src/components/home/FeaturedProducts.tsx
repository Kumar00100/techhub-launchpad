import { ChevronRight, Star } from 'lucide-react';
import { products, formatPrice } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export const FeaturedProducts = () => {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-4">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-bold">Featured Products</h2>
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-1 text-sm font-semibold text-primary"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
        {featuredProducts.map((product, index) => (
          <button
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className={`flex-shrink-0 w-40 bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] animate-fade-up stagger-${index + 1}`}
            style={{ opacity: 0 }}
          >
            <div className="relative aspect-square bg-muted">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <div className="p-3 text-left">
              <h3 className="text-sm font-semibold line-clamp-2 leading-tight mb-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 fill-warning text-warning" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-[10px] text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
