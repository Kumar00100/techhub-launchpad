import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, formatPrice, vendors } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === id);
  const vendor = product ? vendors.find((v) => v.id === product.vendorId) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success('Added to cart', {
      description: `${quantity}x ${product.name}`,
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart'),
      },
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-transparent safe-top">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="bg-card/80 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-card/80 backdrop-blur-sm shadow-sm"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-destructive text-destructive' : ''
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-card/80 backdrop-blur-sm shadow-sm"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative bg-muted">
        <div className="aspect-square">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-contain animate-fade-in"
          />
        </div>
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImage
                    ? 'bg-primary w-4'
                    : 'bg-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
        {product.discount && (
          <span className="absolute top-20 left-4 px-3 py-1 text-sm font-bold bg-destructive text-destructive-foreground rounded-full">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 py-4 space-y-4">
        {/* Title & Rating */}
        <div className="animate-fade-up" style={{ opacity: 0 }}>
          <h1 className="text-xl font-bold leading-tight mb-2">{product.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
              <span className="text-sm font-bold text-success">{product.rating}</span>
              <Star className="w-4 h-4 fill-success text-success" />
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount.toLocaleString()} ratings
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="animate-fade-up stagger-1" style={{ opacity: 0 }}>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-semibold text-success">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Inclusive of all taxes
          </p>
        </div>

        {/* Vendor */}
        {vendor && (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-xl animate-fade-up stagger-2" style={{ opacity: 0 }}>
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{vendor.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  {vendor.rating}
                </span>
                <span>•</span>
                <span>{vendor.location}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{vendor.deliveryTime}</p>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 animate-fade-up stagger-3" style={{ opacity: 0 }}>
          <div className="flex flex-col items-center gap-1 p-3 bg-muted rounded-xl">
            <Truck className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-center font-medium">Free Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 bg-muted rounded-xl">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-center font-medium">1 Year Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 bg-muted rounded-xl">
            <RotateCcw className="w-5 h-5 text-primary" />
            <span className="text-[10px] text-center font-medium">7 Day Return</span>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="animate-fade-up stagger-4" style={{ opacity: 0 }}>
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-xl animate-fade-up stagger-5" style={{ opacity: 0 }}>
          <span className="font-medium">Quantity</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {product.stock < 10 && (
          <p className="text-sm text-warning font-medium">
            Only {product.stock} items left in stock!
          </p>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button variant="hero" size="lg" className="flex-1" onClick={handleBuyNow}>
            <Zap className="w-5 h-5 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
