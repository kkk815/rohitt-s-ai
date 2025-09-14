import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { action, prompt, tone, platform, post } = await req.json();

    if (action === "generate") {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `You are Rohit's AI — expert social media assistant.` },
          { role: "user", content: prompt },
        ],
      });
      return NextResponse.json({ post: response.choices[0]?.message?.content?.trim() || "" });
    }

    if (action === "review") {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `Review post for clarity, tone, and engagement. Return JSON.` },
          { role: "user", content: post },
        ],
        response_format: { type: "json_object" },
      });
      const json = response.choices[0]?.message?.content?.trim();
      return NextResponse.json(JSON.parse(json || "{}"));
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}