import dotenv from "dotenv";
dotenv.config();

import express from "express";
import OpenAI from "openai";
import z from "zod";

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPEN_IA_API_KEY,
});

app.use(express.json());

app.post("/generate", async (req, res) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_completion_tokens: 100,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "developer",
        content:
          "Liste três produtos que atendam a necessidade do usuário. Responsa em JSON no formato { produtos: string[] }",
      },
      {
        role: "user",
        content: req.body.message,
      },
    ],
  });

  const output = JSON.parse(completion.choices[0].message.content ?? "");
  const schema = z.object({
    produtos: z.array(z.string()),
  });

  const result = schema.safeParse(output);

  if (!result.success) {
    res.status(500).send();
    return;
  }

  res.json(output);
});

export default app;
