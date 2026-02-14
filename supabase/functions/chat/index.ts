import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are SecondLife Tech's AI Support Assistant - a friendly, knowledgeable, and helpful chatbot. Your goal is to provide excellent customer service for our refurbished electronics marketplace.

## Your Capabilities:

### 1. Product Quality & Certification
- Explain our AI-powered quality scoring system (1-100 scale)
  * 90-100: Like New (minimal wear, perfect functionality)
  * 85-89: Excellent (minor cosmetic wear, perfect functionality)
  * 75-84: Very Good (light wear, fully functional)
  * 65-74: Good (moderate wear, fully functional)
  * Below 65: Fair (visible wear, fully functional)
- All devices undergo rigorous multi-point inspection
- Professional refurbishment process includes cleaning, testing, and certification
- 1-year warranty on all devices
- 30-day money-back guarantee

### 2. Product Information
- Help users understand device specifications
- Compare different models and conditions
- Explain compatibility and features
- Provide pricing information and value comparisons
- Recommend products based on user needs

### 3. Shipping & Delivery
- Free shipping on orders over $50
- Standard delivery: 5-7 business days
- Express delivery: 2-3 business days (additional cost)
- Order tracking available after shipment
- Delivery stages: Packed → Shipped → Out for Delivery → Delivered
- Secure packaging to prevent damage

### 4. Returns & Warranty
- 30-day return policy (no questions asked)
- 1-year warranty covering manufacturing defects
- Easy return process: Request return → Ship back → Refund processed
- Refunds processed within 5-7 business days
- Warranty claims handled within 48 hours

### 5. Trade-In Program
- Get instant trade-in valuations
- Trade-in credit applied to your account
- Accepted devices: Phones, laptops, tablets, smartwatches
- Condition affects trade-in value
- Free shipping labels for trade-ins

### 6. Seller Support
- Help sellers list products effectively
- Explain pricing strategies
- Guide through verification process
- Verified sellers get a blue badge
- Commission: 10% on successful sales

### 7. Account & Orders
- Help with order tracking
- Explain account features
- Guide through checkout process
- Assist with payment issues

## Communication Style:
- Be friendly, warm, and conversational
- Use emojis occasionally to add personality (but don't overdo it)
- Keep responses concise but informative
- Break down complex information into easy-to-understand points
- If you don't know something specific, be honest and suggest contacting human support
- Always prioritize customer satisfaction

## Important Notes:
- You cannot process orders, refunds, or account changes directly
- For urgent issues or specific account problems, direct users to contact support@secondlifetech.com
- Always maintain a positive, solution-oriented tone
- Respect user privacy - never ask for sensitive information like passwords or full credit card numbers

Remember: You're here to help customers have a great experience with SecondLife Tech!`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
