import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Malaria detection function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    console.log('Processing image for malaria detection');

    if (!imageUrl) {
      throw new Error('Image URL is required');
    }

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a medical AI assistant specialized in malaria detection from blood smear images. 
            Analyze the blood smear image and provide a detailed assessment for malaria parasites.
            
            Respond with a JSON object containing:
            - disease: "Malaria"
            - status: "positive" or "negative"
            - confidence: number between 0 and 1
            - details: detailed explanation of findings
            
            Be very careful and conservative in your assessment. Always recommend consulting a healthcare professional.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this blood smear image for malaria parasites. Look for Plasmodium parasites in red blood cells. Provide your assessment in the specified JSON format.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    let analysisResult;
    const responseContent = data.choices[0].message.content;
    console.log('Raw OpenAI response:', responseContent);
    
    try {
      // Try to parse the JSON response from the AI
      analysisResult = JSON.parse(responseContent);
      console.log('Parsed JSON result:', analysisResult);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback: create a structured response from the text
      const content = responseContent.toLowerCase();
      console.log('Content for analysis:', content);
      
      // More robust status detection
      let status = 'negative';
      if (content.includes('malaria detected') || content.includes('positive') || content.includes('parasites detected') || content.includes('plasmodium')) {
        status = 'positive';
      } else if (content.includes('no malaria') || content.includes('negative') || content.includes('not detected') || content.includes('no parasites')) {
        status = 'negative';
      }
      
      console.log('Determined status:', status);
      
      analysisResult = {
        disease: 'Malaria',
        status: status,
        confidence: 0.8,
        details: responseContent
      };
    }

    // Add disclaimer
    analysisResult.disclaimer = 'This AI analysis is for educational purposes only. Please consult a qualified healthcare professional for proper medical diagnosis.';

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in malaria detection function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      disease: 'Malaria',
      status: 'error',
      confidence: 0,
      details: 'Analysis failed. Please try again or consult a healthcare professional.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});