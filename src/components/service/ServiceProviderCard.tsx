import { Star, MapPin, Clock, ChevronRight } from 'lucide-react';
import { ServiceProvider } from '@/types';
import { formatPrice } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  index?: number;
}

export const ServiceProviderCard = ({ provider, index = 0 }: ServiceProviderCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/service-provider/${provider.id}`)}
      className={`w-full bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] animate-fade-up`}
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
    >
      <div className="flex gap-4 p-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-base">{provider.name}</h3>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-success/10 rounded">
              <span className="text-xs font-bold text-success">{provider.rating}</span>
              <Star className="w-3 h-3 fill-success text-success" />
            </div>
            <span className="text-xs text-muted-foreground">
              ({provider.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {provider.distance} km away
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {provider.experience} exp
            </span>
          </div>

          <p className="text-sm font-medium text-primary">
            {formatPrice(provider.priceRange.min)} - {formatPrice(provider.priceRange.max)}
          </p>
        </div>
      </div>
    </button>
  );
};
