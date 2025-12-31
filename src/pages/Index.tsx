import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/home/SearchBar';
import { PromoBanner } from '@/components/home/PromoBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ServiceSection } from '@/components/home/ServiceSection';
import { BottomNav } from '@/components/layout/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <SearchBar />
      <main>
        <PromoBanner />
        <CategoryGrid />
        <FeaturedProducts />
        <ServiceSection />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
