import { ArrowLeft, Package, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';
import { formatPrice } from '@/data/mockData';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    status: 'shipped',
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop' },
    ],
    total: 159900,
    date: '2024-12-28',
    vendorName: 'TechWorld Electronics',
    estimatedDelivery: 'Jan 2, 2025',
  },
  {
    id: 'ORD-2024-002',
    status: 'delivered',
    items: [
      { name: 'Sony WH-1000XM5', quantity: 1, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop' },
      { name: 'AirPods Pro 2nd Gen', quantity: 1, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100&h=100&fit=crop' },
    ],
    total: 54890,
    date: '2024-12-20',
    vendorName: 'Audio Masters',
    deliveredDate: 'Dec 24, 2024',
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
  processing: { label: 'Processing', color: 'text-primary', bg: 'bg-primary/10', icon: Package },
  shipped: { label: 'Shipped', color: 'text-secondary', bg: 'bg-secondary/10', icon: Package },
  delivered: { label: 'Delivered', color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2 },
};

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">My Orders</h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {mockOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Package className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Button onClick={() => navigate('/products')}>Browse Products</Button>
          </div>
        ) : (
          mockOrders.map((order, index) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <button
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                className={`w-full bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md active:scale-[0.99] animate-fade-up`}
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                      <p className="text-sm font-medium">{order.vendorName}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bg}`}>
                      <StatusIcon className={`w-3 h-3 ${status.color}`} />
                      <span className={`text-xs font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg border-2 border-card object-cover"
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {order.items[0].name}
                      </p>
                      {order.items.length > 1 && (
                        <p className="text-xs text-muted-foreground">
                          +{order.items.length - 1} more item(s)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-sm font-bold">{formatPrice(order.total)}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.status === 'delivered'
                          ? `Delivered on ${order.deliveredDate}`
                          : `Expected by ${order.estimatedDelivery}`}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Orders;
