import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Laptop, Headphones, ArrowRight, Loader2, Sparkles, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const deviceTypes = [
  { value: 'phone', label: 'Smartphone', icon: Smartphone },
  { value: 'laptop', label: 'Laptop', icon: Laptop },
  { value: 'accessory', label: 'Accessory', icon: Headphones },
];

const conditions = [
  { value: 'like-new', label: 'Like New', description: 'No visible wear, works perfectly' },
  { value: 'excellent', label: 'Excellent', description: 'Minor signs of use, fully functional' },
  { value: 'good', label: 'Good', description: 'Some scratches or wear, works well' },
  { value: 'fair', label: 'Fair', description: 'Visible wear, may have minor issues' },
  { value: 'poor', label: 'Poor', description: 'Heavy wear or functional issues' },
];

const commonIssues = [
  { id: 'screen-damage', label: 'Screen damage or cracks' },
  { id: 'battery-issues', label: 'Battery doesn\'t hold charge' },
  { id: 'cosmetic-damage', label: 'Cosmetic damage (dents, scratches)' },
  { id: 'button-issues', label: 'Buttons not working properly' },
  { id: 'speaker-issues', label: 'Speaker or microphone issues' },
  { id: 'charging-issues', label: 'Charging port problems' },
];

interface TradeInEvaluation {
  estimatedValue: number;
  conditionScore: number;
  explanation: string;
  recommendations: string[];
  marketDemand: 'low' | 'medium' | 'high';
}

export default function TradeIn() {
  const [step, setStep] = useState(1);
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [storage, setStorage] = useState('');
  const [condition, setCondition] = useState('');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<TradeInEvaluation | null>(null);

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleEvaluate = async () => {
    if (!deviceType || !brand || !model || !condition) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsEvaluating(true);

    try {
      const { data, error } = await supabase.functions.invoke('evaluate-trade-in', {
        body: {
          deviceType,
          brand,
          model,
          storage,
          condition,
          issues: selectedIssues.map(id => commonIssues.find(i => i.id === id)?.label).filter(Boolean),
        },
      });

      if (error) throw error;

      setEvaluation(data);
      setStep(3);
    } catch (error) {
      console.error('Evaluation error:', error);
      toast.error('Failed to evaluate device. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Valuation</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">
            Trade In Your Device
          </h1>
          <p className="text-muted-foreground text-lg">
            Get instant AI-powered valuations and earn store credit for your old electronics
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-24 md:w-32 h-1 mx-2 rounded ${
                      step > s ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary' : 'text-muted-foreground'}>Device Info</span>
            <span className={step >= 2 ? 'text-primary' : 'text-muted-foreground'}>Condition</span>
            <span className={step >= 3 ? 'text-primary' : 'text-muted-foreground'}>Valuation</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
                <CardDescription>Tell us about your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Device Type */}
                <div>
                  <Label className="mb-3 block">Device Type *</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {deviceTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setDeviceType(type.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          deviceType === type.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <type.icon className={`h-8 w-8 mx-auto mb-2 ${
                          deviceType === type.value ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand & Model */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Apple, Samsung, Dell"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      placeholder="e.g., iPhone 14 Pro, Galaxy S23"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <Label htmlFor="storage">Storage Capacity</Label>
                  <Select value={storage} onValueChange={setStorage}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="32gb">32 GB</SelectItem>
                      <SelectItem value="64gb">64 GB</SelectItem>
                      <SelectItem value="128gb">128 GB</SelectItem>
                      <SelectItem value="256gb">256 GB</SelectItem>
                      <SelectItem value="512gb">512 GB</SelectItem>
                      <SelectItem value="1tb">1 TB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!deviceType || !brand || !model}
                  className="w-full"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Device Condition</CardTitle>
                <CardDescription>Be honest for an accurate valuation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Condition */}
                <div>
                  <Label className="mb-3 block">Overall Condition *</Label>
                  <div className="space-y-2">
                    {conditions.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setCondition(c.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          condition === c.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium">{c.label}</div>
                        <div className="text-sm text-muted-foreground">{c.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Issues */}
                <div>
                  <Label className="mb-3 block">Known Issues (if any)</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {commonIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedIssues.includes(issue.id)
                            ? 'border-destructive bg-destructive/10'
                            : 'border-border hover:border-border/80'
                        }`}
                        onClick={() => handleIssueToggle(issue.id)}
                      >
                        <Checkbox
                          checked={selectedIssues.includes(issue.id)}
                          onCheckedChange={() => handleIssueToggle(issue.id)}
                        />
                        <span className="text-sm">{issue.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleEvaluate}
                    disabled={!condition || isEvaluating}
                    className="flex-1"
                    size="lg"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get AI Valuation
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && evaluation && (
            <div className="space-y-6 animate-fade-in">
              {/* Value Card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Trade-In Value</p>
                    <div className="text-5xl font-display font-bold text-gradient mb-4">
                      ${evaluation.estimatedValue}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Badge className={getDemandColor(evaluation.marketDemand)}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {evaluation.marketDemand.charAt(0).toUpperCase() + evaluation.marketDemand.slice(1)} Demand
                      </Badge>
                    </div>
                  </div>

                  {/* Condition Score */}
                  <div className="mt-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Condition Score</span>
                      <span className="font-semibold">{evaluation.conditionScore}/100</span>
                    </div>
                    <Progress value={evaluation.conditionScore} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Valuation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">AI Analysis</h4>
                    <p className="text-muted-foreground text-sm">{evaluation.explanation}</p>
                  </div>

                  {evaluation.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="space-y-2">
                        {evaluation.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                    <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Final value may vary based on physical inspection. Trade-in credit is valid for 30 days.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setEvaluation(null);
                    setDeviceType('');
                    setBrand('');
                    setModel('');
                    setStorage('');
                    setCondition('');
                    setSelectedIssues([]);
                  }}
                  className="flex-1"
                >
                  Start New Trade-In
                </Button>
                <Button className="flex-1" size="lg">
                  Accept & Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
