import { useState, useMemo } from 'react';
import { ArrowLeft, Search as SearchIcon, X, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories, serviceCategories } from '@/data/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';

const recentSearches = ['iPhone 15', 'Screen repair', 'AirPods', 'Laptop service'];
const trendingSearches = ['MacBook Pro', 'Samsung Galaxy', 'AC service', 'TV repair'];

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(true);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.vendorName.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const categoryResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return categories.filter((cat) => cat.name.toLowerCase().includes(lowerQuery));
  }, [query]);

  const serviceResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return serviceCategories.filter(
      (svc) =>
        svc.name.toLowerCase().includes(lowerQuery) ||
        svc.description.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const hasResults =
    searchResults.length > 0 ||
    categoryResults.length > 0 ||
    serviceResults.length > 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products, services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {!query ? (
          /* Suggestions */
          <div className="space-y-6 animate-fade-in">
            {/* Recent */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                <Clock className="w-4 h-4" />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Quick Access */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Browse Categories
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/products?category=${cat.id}`)}
                    className="flex flex-col items-center gap-1 p-3 bg-card border border-border/50 rounded-xl hover:shadow-md transition-all"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-[10px] font-medium text-center">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : hasResults ? (
          /* Results */
          <div className="space-y-6">
            {categoryResults.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoryResults.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigate(`/products?category=${cat.id}`)}
                      className="flex items-center gap-2 px-3 py-2 bg-card border border-border/50 rounded-lg hover:shadow-md transition-all"
                    >
                      <span>{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {serviceResults.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {serviceResults.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => navigate(`/services/${svc.id}`)}
                      className="flex items-center gap-2 px-3 py-2 bg-secondary/10 border border-secondary/20 rounded-lg hover:shadow-md transition-all"
                    >
                      <span>{svc.icon}</span>
                      <span className="text-sm font-medium">{svc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  Products ({searchResults.length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {searchResults.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* No Results */
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <SearchIcon className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold mb-1">No results found</h3>
            <p className="text-sm text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Search;
