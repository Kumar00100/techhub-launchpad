import { ChevronRight, Wrench } from 'lucide-react';
import { serviceCategories } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export const ServiceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4">
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Repair Services</h2>
            <p className="text-xs text-muted-foreground">Book at your doorstep</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-1 text-sm font-semibold text-primary"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4">
        {serviceCategories.map((service, index) => (
          <button
            key={service.id}
            onClick={() => navigate(`/services/${service.id}`)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 animate-fade-up stagger-${index + 1}`}
            style={{ opacity: 0 }}
          >
            <span className="text-3xl">{service.icon}</span>
            <span className="text-xs font-medium text-center leading-tight">
              {service.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
