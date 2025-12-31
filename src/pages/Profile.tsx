import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Heart,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Gift,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';

const menuItems = [
  { icon: User, label: 'Edit Profile', path: '/profile/edit' },
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payments' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: Gift, label: 'Refer & Earn', path: '/referral' },
  { icon: Star, label: 'My Reviews', path: '/reviews' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: HelpCircle, label: 'Help Center', path: '/help' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Profile</h1>
        </div>

        {/* User Info */}
        <div className="px-4 pb-6 pt-2">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-primary-foreground/30 object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm opacity-80">{user.email}</p>
              <p className="text-sm opacity-80">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 -mt-4 mb-4">
        <button
          onClick={() => navigate('/orders')}
          className="bg-card rounded-xl p-4 shadow-md border border-border/50 text-center transition-all hover:shadow-lg active:scale-95"
        >
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground font-medium">Orders</p>
        </button>
        <button
          onClick={() => navigate('/wishlist')}
          className="bg-card rounded-xl p-4 shadow-md border border-border/50 text-center transition-all hover:shadow-lg active:scale-95"
        >
          <p className="text-2xl font-bold text-primary">5</p>
          <p className="text-xs text-muted-foreground font-medium">Wishlist</p>
        </button>
        <button
          onClick={() => navigate('/reviews')}
          className="bg-card rounded-xl p-4 shadow-md border border-border/50 text-center transition-all hover:shadow-lg active:scale-95"
        >
          <p className="text-2xl font-bold text-primary">8</p>
          <p className="text-xs text-muted-foreground font-medium">Reviews</p>
        </button>
      </div>

      {/* Menu */}
      <div className="px-4">
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  index < menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full mt-4 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          TechHub v1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
