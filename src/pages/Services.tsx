import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { serviceCategories, serviceProviders } from '@/data/mockData';
import { ServiceProviderCard } from '@/components/service/ServiceProviderCard';
import { BottomNav } from '@/components/layout/BottomNav';

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-gradient-hero text-primary-foreground safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Repair Services</h1>
            <p className="text-xs opacity-80 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              New Delhi
            </p>
          </div>
        </div>
      </header>

      <main>
        {/* Service Categories */}
        <section className="px-4 py-4">
          <h2 className="font-bold mb-3">What do you need help with?</h2>
          <div className="grid grid-cols-3 gap-3">
            {serviceCategories.map((service, index) => (
              <button
                key={service.id}
                onClick={() => navigate(`/services/${service.id}`)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 animate-fade-up`}
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              >
                <span className="text-3xl">{service.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Nearby Providers */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold">Nearby Service Providers</h2>
              <p className="text-xs text-muted-foreground">
                Sorted by distance (nearest first)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {serviceProviders
              .sort((a, b) => a.distance - b.distance)
              .map((provider, index) => (
                <ServiceProviderCard
                  key={provider.id}
                  provider={provider}
                  index={index}
                />
              ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Services;
