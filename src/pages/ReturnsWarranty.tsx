import { Layout } from '@/components/layout/Layout';
import { RefreshCw, Shield, Clock, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const returnSteps = [
    {
        step: 1,
        title: 'Request Return',
        description: 'Log into your account and request a return from your order history',
        icon: Package,
    },
    {
        step: 2,
        title: 'Get Shipping Label',
        description: 'We\'ll email you a prepaid shipping label within 24 hours',
        icon: RefreshCw,
    },
    {
        step: 3,
        title: 'Ship the Item',
        description: 'Pack the item securely and ship it using the provided label',
        icon: ArrowRight,
    },
    {
        step: 4,
        title: 'Get Refund',
        description: 'Receive your refund within 5-7 business days after we receive the item',
        icon: CheckCircle,
    },
];

const warrantyFeatures = [
    {
        title: '1-Year Warranty',
        description: 'All devices come with a comprehensive 1-year warranty',
        icon: Shield,
    },
    {
        title: 'Manufacturing Defects',
        description: 'Covers all manufacturing defects and hardware failures',
        icon: CheckCircle,
    },
    {
        title: 'Fast Claims',
        description: 'Warranty claims processed within 48 hours',
        icon: Clock,
    },
    {
        title: 'Free Repairs',
        description: 'No cost for repairs or replacements under warranty',
        icon: RefreshCw,
    },
];

export default function ReturnsWarranty() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Shield className="h-4 w-4" />
                            <span>Your Purchase is Protected</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Returns & Warranty
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Shop with confidence. 30-day returns and 1-year warranty on all devices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Return Policy */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold mb-4">
                            30-Day Return Policy
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Not satisfied? Return it within 30 days, no questions asked.
                        </p>
                    </div>

                    {/* Return Conditions */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader>
                                <Clock className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>30 Days</CardTitle>
                                <CardDescription>
                                    Return window from delivery date
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Package className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Original Condition</CardTitle>
                                <CardDescription>
                                    Item must be in original packaging
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <RefreshCw className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Free Returns</CardTitle>
                                <CardDescription>
                                    We provide prepaid shipping labels
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Return Process */}
                    <div className="mb-12">
                        <h3 className="font-display text-2xl font-bold mb-8 text-center">
                            How to Return an Item
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {returnSteps.map((step) => (
                                <Card key={step.step} className="relative">
                                    <CardHeader>
                                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                            {step.step}
                                        </div>
                                        <step.icon className="h-8 w-8 text-primary mb-2" />
                                        <CardTitle className="text-lg">{step.title}</CardTitle>
                                        <CardDescription>{step.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Return Eligibility */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle>Return Eligibility</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                                <div>
                                    <p className="font-medium">Eligible for Return</p>
                                    <p className="text-sm text-muted-foreground">
                                        Unopened items, items with defects, items not as described, changed your mind
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                                <div>
                                    <p className="font-medium">Full Refund</p>
                                    <p className="text-sm text-muted-foreground">
                                        Original payment method refunded within 5-7 business days
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                                <div>
                                    <p className="font-medium">No Restocking Fee</p>
                                    <p className="text-sm text-muted-foreground">
                                        We don't charge any restocking fees for returns
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Warranty Section */}
            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold mb-4">
                            1-Year Warranty Coverage
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Every device comes with comprehensive warranty protection
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {warrantyFeatures.map((feature, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <feature.icon className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    {/* What's Covered */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-success">✓ What's Covered</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm">• Manufacturing defects</p>
                                <p className="text-sm">• Hardware failures</p>
                                <p className="text-sm">• Battery issues (below 80% capacity)</p>
                                <p className="text-sm">• Screen defects</p>
                                <p className="text-sm">• Button malfunctions</p>
                                <p className="text-sm">• Charging port issues</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-destructive">✗ What's Not Covered</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm">• Physical damage (drops, cracks)</p>
                                <p className="text-sm">• Water damage</p>
                                <p className="text-sm">• Software issues</p>
                                <p className="text-sm">• Cosmetic wear and tear</p>
                                <p className="text-sm">• Unauthorized repairs</p>
                                <p className="text-sm">• Lost or stolen devices</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <Card className="max-w-4xl mx-auto bg-gradient-primary text-primary-foreground">
                    <CardContent className="p-8 md:p-12 text-center">
                        <Shield className="h-12 w-12 mx-auto mb-4" />
                        <h2 className="font-display text-3xl font-bold mb-4">
                            Need to Make a Claim?
                        </h2>
                        <p className="text-lg opacity-90 mb-6">
                            Our support team is ready to help with returns or warranty claims
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button variant="accent" size="lg">
                                    Contact Support
                                </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 border-white/20">
                                    View My Orders
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </Layout>
    );
}
