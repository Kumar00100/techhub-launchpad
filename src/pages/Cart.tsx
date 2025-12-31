import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/data/mockData';
import { BottomNav } from '@/components/layout/BottomNav';

const Cart = () => {
  const navigate = useNavigate();
  const { items, getGroupedByVendor, updateQuantity, removeItem, getTotalAmount } =
    useCartStore();
  const vendorGroups = getGroupedByVendor();
  const totalAmount = getTotalAmount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-40 bg-card border-b border-border safe-top">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Shopping Cart</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything yet
          </p>
          <Button onClick={() => navigate('/products')}>
            Start Shopping
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      <header className="sticky top-0 z-40 bg-card border-b border-border safe-top">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Shopping Cart ({items.length})</h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {vendorGroups.map((group, groupIndex) => (
          <div
            key={group.vendor.id}
            className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden animate-fade-up"
            style={{ animationDelay: `${groupIndex * 0.1}s`, opacity: 0 }}
          >
            {/* Vendor Header */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 border-b border-border">
              {group.vendor.logo && (
                <img
                  src={group.vendor.logo}
                  alt={group.vendor.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm">{group.vendor.name}</p>
                <p className="text-xs text-muted-foreground">
                  Delivery: {group.vendor.deliveryTime}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-border">
              {group.items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-bold mb-2">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-muted rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-6 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vendor Subtotal */}
            <div className="p-3 bg-muted/30 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(group.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  Delivery
                </span>
                <span
                  className={
                    group.deliveryFee === 0 ? 'text-success font-medium' : ''
                  }
                >
                  {group.deliveryFee === 0
                    ? 'FREE'
                    : formatPrice(group.deliveryFee)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Summary */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 safe-bottom">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold">{formatPrice(totalAmount)}</p>
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Cart;
