import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  token: string;
  type: string;
  redirect_to?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Send confirmation email function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, type, redirect_to }: ConfirmationEmailRequest = await req.json();
    
    console.log("Processing confirmation email for:", email, "type:", type);

    const confirmationUrl = `${Deno.env.get("SUPABASE_URL")}/auth/v1/verify?token=${token}&type=${type}${redirect_to ? `&redirect_to=${redirect_to}` : ''}`;

    const emailResponse = await resend.emails.send({
      from: "AcuVeda <onboarding@resend.dev>",
      to: [email],
      subject: "Confirm your email - AcuVeda",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Welcome to AcuVeda!</h1>
          <p style="color: #666; font-size: 16px;">Thank you for signing up. Please confirm your email address to get started.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Confirm Email Address
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${confirmationUrl}" style="color: #007bff; word-break: break-all;">${confirmationUrl}</a>
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you didn't create an account with AcuVeda, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);