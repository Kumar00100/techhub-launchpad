import { Bell, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-gradient-hero text-primary-foreground safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Location */}
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <MapPin className="w-4 h-4" />
          <div className="text-left">
            <p className="text-[10px] opacity-80">Deliver to</p>
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-semibold">New Delhi</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-extrabold tracking-tight">
            Tech<span className="text-secondary">Hub</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate('/notifications')}
          >
            <div className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};
