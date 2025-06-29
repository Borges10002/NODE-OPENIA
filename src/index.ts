import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPEN_IA_API_KEY,
});

client.chat.completions
  .create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: "Escreve uma mensgem de uma frase de nodejs",
      },
    ],
  })
  .then((completions) => {
    console.log(completions.choices[0].message.content);
  });
