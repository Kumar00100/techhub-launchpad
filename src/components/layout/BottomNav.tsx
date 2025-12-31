import { Home, Search, ShoppingCart, Package, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: Package, label: 'Orders', path: '/orders' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const showBadge = item.path === '/cart' && totalItems > 0;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center w-16 h-full transition-all duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-200',
                    isActive && 'scale-110'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full px-1">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] mt-0.5 font-medium transition-all duration-200',
                  isActive && 'font-semibold'
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
