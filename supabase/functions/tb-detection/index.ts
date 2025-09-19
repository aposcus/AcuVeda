import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('TB Detection function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    console.log('Processing TB detection request');

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
            content: `You are an AI medical imaging assistant specialized in tuberculosis detection from chest X-rays. Analyze the provided chest X-ray image and provide a structured assessment. 

IMPORTANT: 
- "positive" means tuberculosis IS DETECTED or PRESENT
- "negative" means tuberculosis is NOT DETECTED or ABSENT
- Be very clear in your assessment

Return your response as a JSON object with the following format:
            {
              "disease": "Tuberculosis",
              "status": "positive" | "negative" | "inconclusive",
              "confidence": number between 0 and 1,
              "details": "detailed explanation of findings"
            }

Look for TB signs such as:
- Cavitary lesions in upper lobes
- Consolidation patterns
- Pleural effusions
- Lymphadenopathy
- Miliary patterns

If you see signs of TB, status should be "positive".
If you see no signs of TB, status should be "negative".

Important: This is for educational/demonstration purposes only and should not replace professional medical diagnosis.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please analyze this chest X-ray for signs of tuberculosis. Provide a detailed assessment in the specified JSON format.'
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
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    let analysisResult;
    const responseContent = data.choices[0].message.content;
    console.log('Raw OpenAI response:', responseContent);
    
    try {
      // Try to parse as JSON first
      analysisResult = JSON.parse(responseContent);
      console.log('Parsed JSON result:', analysisResult);
    } catch (parseError) {
      console.log('Failed to parse as JSON, using fallback parsing');
      // Fallback: extract information from text response
      const content = responseContent.toLowerCase();
      console.log('Content for analysis:', content);
      
      // More robust status detection
      let status = 'inconclusive';
      if (content.includes('tuberculosis detected') || content.includes('positive') || content.includes('tb detected')) {
        status = 'positive';
      } else if (content.includes('no tuberculosis') || content.includes('negative') || content.includes('not detected')) {
        status = 'negative';
      }
      
      console.log('Determined status:', status);
      
      analysisResult = {
        disease: 'Tuberculosis',
        status: status,
        confidence: 0.75,
        details: responseContent
      };
    }

    // Validate result structure
    if (!analysisResult.disease) analysisResult.disease = 'Tuberculosis';
    if (!analysisResult.status) analysisResult.status = 'inconclusive';
    if (!analysisResult.confidence) analysisResult.confidence = 0.5;
    if (!analysisResult.details) analysisResult.details = 'Analysis completed';

    console.log('TB detection completed successfully');

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in TB detection function:', error);
    
    return new Response(JSON.stringify({ 
      disease: 'Tuberculosis',
      status: 'error',
      confidence: 0,
      details: `Analysis failed: ${error.message}. Please try again with a clearer image or consult a healthcare professional.`
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});