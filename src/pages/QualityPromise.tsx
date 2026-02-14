import { Layout } from '@/components/layout/Layout';
import { Shield, CheckCircle, Award, Sparkles, Microscope, Wrench, Package, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const qualityScores = [
    { range: '90-100', label: 'Like New', description: 'Minimal wear, perfect functionality', color: 'text-green-500', bg: 'bg-green-500' },
    { range: '85-89', label: 'Excellent', description: 'Minor cosmetic wear, perfect functionality', color: 'text-blue-500', bg: 'bg-blue-500' },
    { range: '75-84', label: 'Very Good', description: 'Light wear, fully functional', color: 'text-cyan-500', bg: 'bg-cyan-500' },
    { range: '65-74', label: 'Good', description: 'Moderate wear, fully functional', color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { range: '<65', label: 'Fair', description: 'Visible wear, fully functional', color: 'text-orange-500', bg: 'bg-orange-500' },
];

const inspectionSteps = [
    {
        icon: Microscope,
        title: 'Visual Inspection',
        description: 'Thorough examination of exterior condition, screen, ports, and buttons',
        checks: ['Screen condition', 'Body condition', 'Port functionality', 'Button response'],
    },
    {
        icon: Wrench,
        title: 'Hardware Testing',
        description: 'Comprehensive testing of all hardware components and functionality',
        checks: ['Battery health', 'Camera quality', 'Speaker/microphone', 'Connectivity'],
    },
    {
        icon: Sparkles,
        title: 'Software Verification',
        description: 'Software diagnostics and performance testing',
        checks: ['OS functionality', 'Performance tests', 'Data wiping', 'Factory reset'],
    },
    {
        icon: Package,
        title: 'Refurbishment',
        description: 'Professional cleaning, repairs, and quality improvements',
        checks: ['Deep cleaning', 'Component replacement', 'Quality upgrades', 'Final testing'],
    },
];

const guarantees = [
    {
        icon: Shield,
        title: '1-Year Warranty',
        description: 'Comprehensive warranty on all devices covering manufacturing defects',
    },
    {
        icon: CheckCircle,
        title: '30-Day Returns',
        description: 'No questions asked return policy for complete peace of mind',
    },
    {
        icon: Award,
        title: 'Certified Quality',
        description: 'Every device meets our strict quality standards and certifications',
    },
    {
        icon: Star,
        title: 'Verified Sellers',
        description: 'All sellers are verified and rated by our community',
    },
];

export default function QualityPromise() {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Shield className="h-4 w-4" />
                            <span>Quality You Can Trust</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Our Quality Promise
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Every device undergoes rigorous testing and certification to ensure you get the best quality refurbished electronics.
                        </p>
                    </div>
                </div>
            </section>

            {/* AI Quality Scoring */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold mb-4">
                            AI-Powered Quality Scoring
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Our advanced AI system evaluates every device on a 100-point scale
                        </p>
                    </div>

                    <div className="space-y-6">
                        {qualityScores.map((score, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className={`w-16 h-16 rounded-xl ${score.bg}/10 flex items-center justify-center`}>
                                            <span className={`text-2xl font-bold ${score.color}`}>
                                                {score.range}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-display text-xl font-bold mb-1">{score.label}</h3>
                                            <p className="text-sm text-muted-foreground">{score.description}</p>
                                        </div>
                                    </div>
                                    <Progress
                                        value={parseInt(score.range.split('-')[0]) || 60}
                                        className="h-2"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inspection Process */}
            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold mb-4">
                            Multi-Point Inspection Process
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Every device goes through our comprehensive 4-stage inspection
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {inspectionSteps.map((step, index) => (
                            <Card key={index} className="relative">
                                <CardHeader>
                                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <step.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{step.title}</CardTitle>
                                    <CardDescription>{step.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {step.checks.map((check, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-success" />
                                                <span>{check}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Guarantees */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold mb-4">
                            Our Guarantees
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Shop with confidence knowing you're protected
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {guarantees.map((guarantee, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <guarantee.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{guarantee.title}</CardTitle>
                                    <CardDescription>{guarantee.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-display font-bold text-gradient mb-2">98%</div>
                            <p className="text-muted-foreground">Customer Satisfaction</p>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-bold text-gradient mb-2">50K+</div>
                            <p className="text-muted-foreground">Devices Certified</p>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-bold text-gradient mb-2">4.8/5</div>
                            <p className="text-muted-foreground">Average Quality Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <Card className="max-w-4xl mx-auto bg-gradient-primary text-primary-foreground">
                    <CardContent className="p-8 md:p-12 text-center">
                        <Shield className="h-12 w-12 mx-auto mb-4" />
                        <h2 className="font-display text-3xl font-bold mb-4">
                            Ready to Experience Quality?
                        </h2>
                        <p className="text-lg opacity-90 mb-6">
                            Browse our certified refurbished devices with confidence
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/products">
                                <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-colors">
                                    Shop Now
                                </button>
                            </a>
                            <a href="/help-center">
                                <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold transition-colors">
                                    Learn More
                                </button>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </Layout>
    );
}
