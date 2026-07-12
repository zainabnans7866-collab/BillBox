/// <reference types="jsr:@supabase/functions-js/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {

    const {
      email,
      name,
      productName,
      expiryDate,
    } = await req.json();

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          from: "BillBox <onboarding@resend.dev>",

          to: [email],

          subject: "Your Bill has been Saved",

          html: `
          <h2>BillBox</h2>

          <p>Hello ${name},</p>

          <p>Your bill has been saved successfully.</p>

          <p><b>Product:</b> ${productName}</p>

          <p><b>Warranty Expiry:</b> ${expiryDate}</p>

          <br/>

          <p>Thank you for using BillBox.</p>
          `

        })

      }
    );

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: response.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  }
  catch (error) {

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  }

});