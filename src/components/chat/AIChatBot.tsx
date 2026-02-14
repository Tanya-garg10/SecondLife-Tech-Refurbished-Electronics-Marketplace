import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getMockResponse, simulateStreaming } from './mockResponses';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: number;
}

const QUICK_ACTIONS = [
    { label: 'Product Quality', prompt: 'How do you ensure product quality?' },
    { label: 'Shipping Info', prompt: 'What are your shipping options?' },
    { label: 'Return Policy', prompt: 'What is your return policy?' },
    { label: 'Trade-In Value', prompt: 'How does the trade-in program work?' },
];

// Demo mode - always use mock responses for now
const DEMO_MODE = true;

export function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! 👋 I'm SecondLife Tech's AI assistant (Demo Mode). I can help you with product questions, order tracking, returns, and more. How can I assist you today?",
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (messages.length > 1 && messages.some(m => m.role === 'user')) {
            setShowQuickActions(false);
        }
    }, [messages]);

    const resetChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: "Hi! 👋 I'm SecondLife Tech's AI assistant (Demo Mode). I can help you with product questions, order tracking, returns, and more. How can I assist you today?",
                timestamp: Date.now()
            }
        ]);
        setShowQuickActions(true);
        setInput('');
        toast.success('Chat reset successfully');
    };

    const handleQuickAction = (prompt: string) => {
        if (isLoading) return;
        setInput(prompt);
        setTimeout(() => handleSend(prompt), 100);
    };

    const handleSend = async (quickPrompt?: string) => {
        const messageText = quickPrompt || input.trim();
        if (!messageText || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: messageText,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setShowQuickActions(false);

        let assistantContent = "";

        const updateAssistant = (chunk: string) => {
            assistantContent += chunk;
            setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && prev.length > 1 && prev[prev.length - 2].role === 'user') {
                    return prev.map((m, i) =>
                        i === prev.length - 1 ? { ...m, content: assistantContent } : m
                    );
                }
                return [...prev, { role: 'assistant', content: assistantContent, timestamp: Date.now() }];
            });
        };

        // Use demo mode with mock responses
        const mockResponse = getMockResponse(messageText);
        await simulateStreaming(mockResponse, updateAssistant, () => {
            setIsLoading(false);
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
                    isOpen
                        ? "bg-muted hover:bg-muted/80 text-muted-foreground"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-glow"
                )}
                size="icon"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </Button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-card shadow-xl transition-all duration-300",
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-display font-semibold flex items-center gap-2">
                            AI Support
                            <Badge variant="secondary" className="text-xs">Demo</Badge>
                        </h3>
                        <p className="text-xs text-muted-foreground">Instant responses • Always available</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={resetChat}
                        disabled={isLoading || messages.length <= 1}
                        title="Reset chat"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
                    <div className="flex flex-col gap-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex gap-3 animate-fade-in",
                                    message.role === 'user' ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                        message.role === 'user'
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {message.role === 'user' ? (
                                        <User className="h-4 w-4" />
                                    ) : (
                                        <Bot className="h-4 w-4" />
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap",
                                        message.role === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                            : "bg-muted text-foreground rounded-tl-sm"
                                    )}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {/* Quick Actions */}
                        {showQuickActions && messages.length === 1 && !isLoading && (
                            <div className="flex flex-col gap-2 mt-2">
                                <p className="text-xs text-muted-foreground text-center mb-1">Quick questions:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {QUICK_ACTIONS.map((action) => (
                                        <Button
                                            key={action.label}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs h-auto py-2 px-3 whitespace-normal text-left justify-start"
                                            onClick={() => handleQuickAction(action.prompt)}
                                        >
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className="flex gap-3 animate-fade-in">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    <Bot className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-muted px-4 py-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border p-4">
                    <div className="flex gap-2">
                        <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about products, orders, returns..."
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            size="icon"
                            className="shrink-0"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                        Demo Mode • Pre-written responses
                    </p>
                </div>
            </div>
        </>
    );
}
