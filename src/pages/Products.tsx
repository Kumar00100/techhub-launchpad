import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/data/mockData';
import { BottomNav } from '@/components/layout/BottomNav';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryId ? [categoryId] : []
  );

  const category = categoryId ? categories.find((c) => c.id === categoryId) : null;

  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(product.category);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold flex-1">
            {category ? category.name : 'All Products'}
          </h1>
        </div>

        {/* Sort & Filter Bar */}
        <div className="flex items-center border-t border-border">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-r border-border hover:bg-muted/50 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategories.includes(cat.id)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                Sort by: {sortOptions.find((s) => s.value === sortBy)?.label}
                <ChevronDown className="w-4 h-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Sort By</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      sortBy === option.value
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Results */}
      <div className="px-4 py-4">
        <p className="text-sm text-muted-foreground mb-4">
          Showing {sortedProducts.length} products
        </p>

        <div className="grid grid-cols-2 gap-3">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Products;
