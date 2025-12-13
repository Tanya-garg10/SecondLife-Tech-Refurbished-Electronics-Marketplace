import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Laptop, Headphones, Leaf, Shield, RefreshCw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { Layout } from '@/components/layout/Layout';

const categories = [
  {
    name: 'Phones',
    icon: Smartphone,
    count: 234,
    href: '/products?category=phones',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    name: 'Laptops',
    icon: Laptop,
    count: 156,
    href: '/products?category=laptops',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    name: 'Accessories',
    icon: Headphones,
    count: 312,
    href: '/products?category=accessories',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'AI-powered quality scoring and 1-year warranty on all devices',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Every purchase saves 80% carbon vs. buying new electronics',
  },
  {
    icon: RefreshCw,
    title: 'Certified Refurbished',
    description: 'Multi-point inspection and professional restoration',
  },
  {
    icon: TrendingUp,
    title: 'Best Prices',
    description: 'Save up to 70% compared to retail prices',
  },
];

export default function Index() {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Leaf className="h-4 w-4" />
              <span>Sustainable Tech Marketplace</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              Give Tech a{' '}
              <span className="text-gradient">Second Life</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Buy and sell certified refurbished electronics. Quality guaranteed, 
              prices you'll love, planet-friendly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="heroOutline" size="xl">
                  Start Selling
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">50K+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">Products Listed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of professionally refurbished electronics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.count}+ products</p>
                
                <div className="mt-6 flex items-center text-primary font-medium">
                  Browse
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Featured Deals
            </h2>
            <p className="text-muted-foreground">
              Hand-picked top-quality refurbished devices
            </p>
          </div>
          <Link to="/products">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-hero rounded-3xl border border-border p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose SecondLife Tech?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're not just a marketplace. We're building a sustainable future for tech.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
          
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready to Sell Your Device?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of sellers and give your tech a second life. 
              Get the best price with our AI-powered price predictor.
            </p>
            <Link to="/dashboard">
              <Button variant="accent" size="xl">
                Start Selling Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
