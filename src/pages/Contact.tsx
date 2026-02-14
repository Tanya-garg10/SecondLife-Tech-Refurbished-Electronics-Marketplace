import { Layout } from '@/components/layout/Layout';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Us',
        description: 'support@secondlifetech.com',
        detail: 'Response within 24 hours',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        icon: Phone,
        title: 'Call Us',
        description: '+1 (555) 123-4567',
        detail: 'Mon-Fri, 9AM-6PM EST',
        color: 'text-green-500',
        bg: 'bg-green-500/10',
    },
    {
        icon: MessageCircle,
        title: 'Live Chat',
        description: 'Chat with our AI assistant',
        detail: 'Available 24/7',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        description: '123 Tech Street, San Francisco',
        detail: 'CA 94102, United States',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
    },
];

const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Products' },
    { value: 'support', label: 'Technical Support' },
    { value: 'returns', label: 'Returns & Refunds' },
    { value: 'warranty', label: 'Warranty Claims' },
    { value: 'partnership', label: 'Business Partnership' },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: 'general',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
        setFormData({
            name: '',
            email: '',
            department: 'general',
            subject: '',
            message: '',
        });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-hero py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Have questions? We're here to help. Reach out to us through any of these channels.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactMethods.map((method, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center mb-4`}>
                                    <method.icon className={`h-6 w-6 ${method.color}`} />
                                </div>
                                <CardTitle className="text-lg">{method.title}</CardTitle>
                                <CardDescription className="font-medium text-foreground">
                                    {method.description}
                                </CardDescription>
                                <p className="text-sm text-muted-foreground">{method.detail}</p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back to you as soon as possible
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="department">Department</Label>
                                        <select
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                            required
                                        >
                                            {departments.map(dept => (
                                                <option key={dept.value} value={dept.value}>
                                                    {dept.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="How can we help?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us more about your inquiry..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>Sending...</>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Info Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <Clock className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle>Business Hours</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Monday - Friday</span>
                                        <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Saturday</span>
                                        <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Sunday</span>
                                        <span className="text-sm font-medium">Closed</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-4">
                                        * All times in Eastern Standard Time (EST)
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <MessageCircle className="h-8 w-8 text-primary mb-2" />
                                    <CardTitle>Quick Response</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Need immediate assistance? Try our AI chatbot for instant answers to common questions.
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Chat with AI Assistant
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-primary text-primary-foreground">
                                <CardContent className="p-6">
                                    <h3 className="font-display font-bold mb-2">Need Urgent Help?</h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        For urgent matters, please call us directly during business hours.
                                    </p>
                                    <a href="tel:+15551234567" className="text-sm font-semibold underline">
                                        +1 (555) 123-4567
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-3xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Find quick answers to common questions in our Help Center
                    </p>
                    <a href="/help-center">
                        <Button variant="outline" size="lg">
                            Visit Help Center
                        </Button>
                    </a>
                </div>
            </section>
        </Layout>
    );
}
