import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love by clicking the heart icon.
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">
          My Wishlist ({wishlist.length})
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(item => {
            const product = item.product;
            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
            const inCart = isInCart(product.id);

            return (
              <div
                key={product.id}
                className="bg-card border border-border rounded-xl overflow-hidden group"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-sm font-semibold px-2 py-1 rounded">
                      -{discount}%
                    </span>
                  )}
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors mb-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">{product.brand}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-display font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={inCart ? 'secondary' : 'default'}
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        addToCart(product);
                        toast.success('Added to cart');
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {inCart ? 'In Cart' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        removeFromWishlist(product.id);
                        toast.info('Removed from wishlist');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
