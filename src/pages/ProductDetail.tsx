import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight,
  Sparkles,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductById, products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useStore();
  const inWishlist = isInWishlist(product?.id || '');
  const inCart = isInCart(product?.id || '');

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const getConditionInfo = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          label: 'Excellent - Like New',
          description: 'Device shows minimal signs of use. Battery at 90%+ health.',
        };
      case 'good':
        return {
          color: 'text-primary',
          bg: 'bg-primary/10',
          label: 'Good - Minor Wear',
          description: 'Device shows light signs of use. Battery at 80%+ health.',
        };
      case 'fair':
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          label: 'Fair - Visible Wear',
          description: 'Device shows visible wear but fully functional.',
        };
      default:
        return { color: '', bg: '', label: '', description: '' };
    }
  };

  const conditionInfo = getConditionInfo(product.condition);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-lg px-4 py-1">
                  -{discount}%
                </Badge>
              )}
              {product.qualityScore >= 95 && (
                <Badge className="absolute top-4 right-4 gap-1 bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                  Top Pick
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImage === index 
                        ? 'border-primary' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </span>
              {product.seller.verified && (
                <Badge variant="outline" className="gap-1 text-primary border-primary/20">
                  <Shield className="h-3 w-3" />
                  Verified Seller
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5',
                      i < Math.floor(product.rating) 
                        ? 'fill-accent text-accent' 
                        : 'text-muted'
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-display font-bold text-primary">
                ${product.price}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <Badge variant="secondary" className="text-success">
                Save ${product.originalPrice - product.price}
              </Badge>
            </div>

            {/* Condition */}
            <div className={cn('p-4 rounded-xl', conditionInfo.bg)}>
              <div className="flex items-center gap-2 mb-2">
                <div className={cn('font-semibold', conditionInfo.color)}>
                  {conditionInfo.label}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{conditionInfo.description}</p>
            </div>

            {/* AI Quality Score */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-medium">AI Quality Score</span>
                </div>
                <span className="text-2xl font-display font-bold text-primary">
                  {product.qualityScore}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500"
                  style={{ width: `${product.qualityScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Based on AI analysis of condition, specs, and seller history
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                variant={inCart ? 'secondary' : 'hero'}
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {inCart ? 'Add More' : 'Add to Cart'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className={cn(inWishlist && 'text-destructive border-destructive')}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-secondary/50 rounded-xl">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-muted-foreground">2-5 business days</div>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-xl">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">30-Day Returns</div>
                <div className="text-xs text-muted-foreground">Easy returns</div>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-xl">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">1-Year Warranty</div>
                <div className="text-xs text-muted-foreground">Full coverage</div>
              </div>
            </div>

            <Separator />

            {/* Seller Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={product.seller.avatar} />
                  <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {product.seller.name}
                    {product.seller.verified && (
                      <Shield className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.seller.totalSales} sales • {product.seller.rating} rating
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="specs" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold">{product.rating}</div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < Math.floor(product.rating) 
                              ? 'fill-accent text-accent' 
                              : 'text-muted'
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {product.reviewCount} reviews
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 bg-primary/5 rounded-lg p-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">AI Review Summary</div>
                        <p className="text-sm text-muted-foreground">
                          95% of reviews mention excellent condition and fast shipping. 
                          No suspicious patterns detected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-muted-foreground">
                  Reviews will be loaded here...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
