import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: 'New Year Sale',
    subtitle: 'Up to 50% OFF',
    description: 'On selected electronics',
    gradient: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: 'Free Repairs',
    subtitle: 'First Service FREE',
    description: 'For new users only',
    gradient: 'from-secondary to-success',
  },
  {
    id: 3,
    title: 'Flash Deal',
    subtitle: '₹10,000 OFF',
    description: 'On iPhone 15 Series',
    gradient: 'from-warning to-destructive',
  },
];

export const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-4">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.gradient} p-6 min-h-[140px] flex flex-col justify-center`}
            >
              <p className="text-primary-foreground/80 text-sm font-medium">
                {banner.description}
              </p>
              <h3 className="text-2xl font-extrabold text-primary-foreground mt-1">
                {banner.title}
              </h3>
              <p className="text-3xl font-black text-primary-foreground/90 mt-1">
                {banner.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary-foreground w-6'
                  : 'bg-primary-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
