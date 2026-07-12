import { groq } from "./groqClient";

export async function explainBill(bill) {

  const response = await groq.chat.completions.create({

    model: "meta-llama/llama-4-scout-17b-16e-instruct",

    messages: [
      {
        role: "user",
        content: `
You are a smart warranty assistant.

Explain this bill clearly for the customer.

Product: ${bill.product_name}
Category: ${bill.category}
Price: ₹${bill.price}
Purchase Date: ${bill.purchase_date}
Warranty: ${bill.warranty_months} months
Expiry Date: ${bill.expiry_date}

Give:
1. Product summary
2. Warranty information
3. Important advice

Keep it short and professional.
`
      }
    ]

  });


  return response.choices[0].message.content;

}