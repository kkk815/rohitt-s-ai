'use client';
import { useState } from "react";

export default function RohitsAI() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
    const res = await fetch("/api/rohits-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "generate", prompt, tone: "Casual", platform: "Twitter" }),
    });
    const data = await res.json();
    setResult(data.post || JSON.stringify(data, null, 2));
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rohit's AI</h1>
      <textarea
        className="w-full border p-2 mb-4 rounded"
        rows={4}
        placeholder="Enter your idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generate} className="bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
      {result && <pre className="bg-gray-100 p-4 mt-4 rounded whitespace-pre-wrap">{result}</pre>}
    </div>
  );
}