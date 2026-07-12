import { groq } from "./groqClient";
import { BILL_PROMPT } from "../prompts/billPrompt";
import { fileToBase64 } from "./utils";

export async function scanBill(imageFile) {
  const base64Image = await fileToBase64(imageFile);

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: BILL_PROMPT,
          },
          {
            type: "image_url",
            image_url: {
              url: base64Image,
            },
          },
        ],
      },
    ],
  });

  let result = completion.choices[0].message.content;

  result = result.replace(/```json/g, "");
  result = result.replace(/```/g, "");
  result = result.trim();

  return JSON.parse(result);
}