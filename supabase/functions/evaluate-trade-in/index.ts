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
    const { deviceType, brand, model, storage, condition, issues } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Evaluating trade-in:", { deviceType, brand, model, storage, condition, issues });

    const prompt = `You are an AI device valuation expert for a refurbished electronics marketplace. Evaluate this trade-in request and provide a fair market value.

Device Details:
- Type: ${deviceType}
- Brand: ${brand}
- Model: ${model}
- Storage: ${storage || 'Not specified'}
- Condition: ${condition}
- Known Issues: ${issues?.length ? issues.join(', ') : 'None reported'}

Based on current market values for refurbished devices, provide:
1. An estimated trade-in value in USD (be realistic based on condition)
2. A condition score from 1-100
3. A brief explanation of the valuation
4. Any recommendations for the seller

Respond in this exact JSON format:
{
  "estimatedValue": <number>,
  "conditionScore": <number>,
  "explanation": "<string>",
  "recommendations": ["<string>", "<string>"],
  "marketDemand": "low" | "medium" | "high"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error("AI evaluation failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response:", content);

    // Parse JSON from response
    let evaluation;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        evaluation = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback evaluation
      evaluation = {
        estimatedValue: 150,
        conditionScore: 70,
        explanation: "Based on the device details provided, this is an estimated value.",
        recommendations: ["Provide clear photos", "Include original accessories if available"],
        marketDemand: "medium"
      };
    }

    return new Response(JSON.stringify(evaluation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Trade-in evaluation error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
