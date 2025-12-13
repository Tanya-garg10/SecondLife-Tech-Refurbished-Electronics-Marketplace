import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Users,
  Star,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,458',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Total Orders',
    value: '234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
  },
  {
    title: 'Products Listed',
    value: '48',
    change: '+3',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'Avg Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: Star,
  },
];

const recentOrders = [
  { id: 'ORD-001', product: 'iPhone 14 Pro Max', buyer: 'John D.', price: '$849', status: 'shipped' },
  { id: 'ORD-002', product: 'MacBook Pro 14"', buyer: 'Sarah M.', price: '$1,649', status: 'packed' },
  { id: 'ORD-003', product: 'AirPods Pro 2', buyer: 'Mike R.', price: '$179', status: 'delivered' },
  { id: 'ORD-004', product: 'Samsung Galaxy S23', buyer: 'Lisa K.', price: '$729', status: 'pending' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const myProducts = products.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/10 text-success';
      case 'shipped':
        return 'bg-primary/10 text-primary';
      case 'packed':
        return 'bg-accent/10 text-accent';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your products and track your sales
            </p>
          </div>
          <Button variant="hero">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      'gap-1',
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {stat.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-display font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Your latest orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <div className="font-medium">{order.product}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.id} • {order.buyer}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{order.price}</div>
                          <Badge variant="secondary" className={cn('capitalize', getStatusColor(order.status))}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>Smart recommendations for your store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Price Optimization</div>
                        <p className="text-sm text-muted-foreground">
                          Your iPhone 14 Pro Max is priced 5% higher than market average. 
                          Consider adjusting to $799 for faster sales.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Demand Forecast</div>
                        <p className="text-sm text-muted-foreground">
                          MacBooks are trending! Consider adding more inventory 
                          - demand expected to increase 23% this month.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-success/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Quality Score Boost</div>
                        <p className="text-sm text-muted-foreground">
                          Add more product photos to increase your quality score 
                          by up to 15% and boost sales conversion.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Products</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Quality</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myProducts.map(product => (
                        <tr key={product.id} className="border-b border-border">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium">${product.price}</td>
                          <td className="py-4 px-4">{product.stock} units</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${product.qualityScore}%` }}
                                />
                              </div>
                              <span className="text-sm">{product.qualityScore}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              Active
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and manage all your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Buyer</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id} className="border-b border-border">
                          <td className="py-4 px-4 font-medium">{order.id}</td>
                          <td className="py-4 px-4">{order.product}</td>
                          <td className="py-4 px-4">{order.buyer}</td>
                          <td className="py-4 px-4 font-medium">{order.price}</td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary" className={cn('capitalize', getStatusColor(order.status))}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trends</CardTitle>
                  <CardDescription>Your sales performance over time</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 opacity-50" />
                  <p className="ml-4">Sales chart coming soon...</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Best performing product categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Phones</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Laptops</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Accessories</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
