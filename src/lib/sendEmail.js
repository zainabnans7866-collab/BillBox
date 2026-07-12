import { supabase } from "./supabaseClient";

export async function sendEmail({
  email,
  name,
  productName,
  expiryDate,
}) {

  console.log("Calling send-email...");

  const { data, error } = await supabase.functions.invoke("send-email", {
    body: {
      email,
      name,
      productName,
      expiryDate,
    },
  });

  console.log("Function data:", data);
  console.log("Function error:", error);

  if (error) {
    alert(error.message);
    throw error;
  }

  return data;
}