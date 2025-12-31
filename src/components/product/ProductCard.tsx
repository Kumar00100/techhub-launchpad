import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success('Added to cart', {
      description: product.name,
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart'),
      },
    });
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] animate-fade-up`}
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
    >
      <div className="relative aspect-square bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full">
            {product.discount}% OFF
          </span>
        )}
        {product.stock < 10 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-medium bg-warning/90 text-warning-foreground rounded-full">
            Only {product.stock} left
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-[10px] text-muted-foreground font-medium mb-1">
          {product.vendorName}
        </p>
        <h3 className="text-sm font-semibold line-clamp-2 leading-tight mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-success/10 rounded">
            <span className="text-xs font-bold text-success">{product.rating}</span>
            <Star className="w-3 h-3 fill-success text-success" />
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through ml-1.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Button
            variant="soft"
            size="icon-sm"
            onClick={handleAddToCart}
            className="rounded-full"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
