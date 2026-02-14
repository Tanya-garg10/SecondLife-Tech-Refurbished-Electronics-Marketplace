import { Layout } from '@/components/layout/Layout';
import { Search, MessageCircle, Package, CreditCard, Truck, RefreshCw, Shield, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const categories = [
    {
        icon: Package,
        title: 'Orders & Shipping',
        description: 'Track orders, shipping info, delivery times',
        articles: 12,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        icon: CreditCard,
        title: 'Payments & Billing',
        description: 'Payment methods, invoices, refunds',
        articles: 8,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
    },
    {
        icon: RefreshCw,
        title: 'Returns & Exchanges',
        description: 'Return policy, exchange process, refunds',
        articles: 10,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
    },
    {
        icon: Shield,
        title: 'Quality & Warranty',
        description: 'Product quality, warranty claims, guarantees',
        articles: 15,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
    },
    {
        icon: Truck,
        title: 'Trade-In Program',
        description: 'Device valuation, trade-in process, credits',
        articles: 7,
        color: 'text-teal-500',
        bg: 'bg-teal-500/10',
    },
    {
        icon: MessageCircle,
        title: 'Account & Profile',
        description: 'Account settings, security, preferences',
        articles: 9,
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
    },
];

const popularArticles = [
    { title: 'How do I track my order?', views: '2.5K', category: 'Orders' },
    { title: 'What is your return policy?', views: '2.1K', category: 'Returns' },
    { title: 'How does the quality scoring work?', views: '1.8K', category: 'Quality' },
    { title: 'How long does shipping take?', views: '1.6K', category: 'Shipping' },
    { title: 'How do I get a trade-in valuation?', views: '1.4K', category: 'Trade-In' },
    { title: 'What payment methods do you accept?', views: '1.2K', category: 'Payments' },
];

export default function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Search our knowledge base or browse categories below
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search for help articles..."
                                className="pl-12 pr-4 py-6 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="font-display text-3xl font-bold mb-8 text-center">
                    Browse by Category
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-xl ${category.bg} flex items-center justify-center mb-4`}>
                                    <category.icon className={`h-6 w-6 ${category.color}`} />
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors">
                                    {category.title}
                                </CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {category.articles} articles
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Popular Articles */}
            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-display text-3xl font-bold mb-8 text-center">
                        Popular Articles
                    </h2>

                    <div className="space-y-4">
                        {popularArticles.map((article, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        <HelpCircle className="h-5 w-5 text-primary" />
                                        <div>
                                            <h3 className="font-semibold hover:text-primary transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {article.category} • {article.views} views
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="container mx-auto px-4 py-16">
                <Card className="max-w-4xl mx-auto bg-gradient-primary text-primary-foreground">
                    <CardContent className="p-8 md:p-12 text-center">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                        <h2 className="font-display text-3xl font-bold mb-4">
                            Still need help?
                        </h2>
                        <p className="text-lg opacity-90 mb-6">
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button variant="accent" size="lg">
                                    Contact Support
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 border-white/20">
                                Chat with AI Assistant
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </Layout>
    );
}
