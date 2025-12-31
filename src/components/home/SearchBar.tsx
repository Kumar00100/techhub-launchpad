import { Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-3 bg-gradient-hero">
      <button
        onClick={() => navigate('/search')}
        className="w-full flex items-center gap-3 bg-card rounded-xl px-4 py-3 shadow-md transition-shadow hover:shadow-lg"
      >
        <Search className="w-5 h-5 text-muted-foreground" />
        <span className="flex-1 text-left text-muted-foreground text-sm">
          Search phones, laptops, repairs...
        </span>
        <div className="w-px h-5 bg-border" />
        <Mic className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
};
