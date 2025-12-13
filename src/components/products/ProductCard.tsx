import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useStore();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-success/10 text-success border-success/20';
      case 'good':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'fair':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant={inCart ? "default" : "glass"}
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </Button>
            <Button
              variant="glass"
              size="icon"
              className={cn(inWishlist && "text-destructive")}
              onClick={handleToggleWishlist}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-accent text-accent-foreground font-semibold">
                -{discount}%
              </Badge>
            )}
            {product.qualityScore >= 95 && (
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Top Pick
              </Badge>
            )}
          </div>

          {/* Wishlist Button - Always visible */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className={cn("h-4 w-4", inWishlist ? "fill-destructive text-destructive" : "text-foreground")} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Brand & Condition */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </span>
            <Badge variant="outline" className={cn("text-xs capitalize", getConditionColor(product.condition))}>
              {product.condition}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
            {product.seller.verified && (
              <Shield className="h-4 w-4 text-primary ml-auto" />
            )}
          </div>

          {/* Quality Score */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${product.qualityScore}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {product.qualityScore}% Quality
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-2xl font-display font-bold text-primary">
              ${product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
