import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Auth hook triggered");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Auth hook body:", JSON.stringify(body, null, 2));

    const { type, table, record, old_record } = body;

    // Handle user signup
    if (type === "INSERT" && table === "users") {
      const user = record;
      console.log("New user signup:", user.email);

      // Call our custom email function
      const emailResponse = await supabase.functions.invoke("send-confirmation-email", {
        body: {
          email: user.email,
          token: user.confirmation_token,
          type: "signup",
          redirect_to: `${Deno.env.get("SUPABASE_URL")}/auth/v1/callback`
        }
      });

      console.log("Email function response:", emailResponse);

      if (emailResponse.error) {
        console.error("Error sending confirmation email:", emailResponse.error);
        return new Response(
          JSON.stringify({ error: "Failed to send confirmation email" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Auth hook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});