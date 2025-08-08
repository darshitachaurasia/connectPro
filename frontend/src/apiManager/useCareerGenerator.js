import { useState } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

const SELECTED_MODEL = "gemini-2.5-pro";
const GOOGLE_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// This prompt encourages a faster, more structured Markdown response.
const systemPrompt = `
You are an expert career counsellor. Your goal is to provide a concise yet comprehensive career guide.
Format your response using Markdown with clear headings.
Use brief bullet points for lists. Keep the language clear and direct.

The sections must be:
1.  **Career Overview**: A short, one-paragraph description.
2.  **Key Skills**: A bulleted list of essential technical and soft skills.
3.  **Salary Estimates (USD)**: A simple list for Entry-level, Mid-level, and Senior-level.
4.  **Industry Outlook**: A brief paragraph on the future scope and trends.
5.  **Learning Resources**: A bulleted list of 2-3 top recommended websites or courses.
`;

export function useCareerGenerator() {
  const [career, setCareer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateCareer(prompt) {
    if (!prompt) return;

    setLoading(true);
    setCareer("");
    setError(null);

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(`Generate a career guide for: ${prompt}`),
    ];

    const llm = new ChatGoogleGenerativeAI({
      model: SELECTED_MODEL,
      temperature: 0.6, // Slightly lowered for more factual responses
      apiKey: GOOGLE_KEY,
      streaming: true, // Enable streaming
    });

    try {
      const stream = await llm.stream(messages);
      for await (const chunk of stream) {
        // Append chunks as they arrive for a real-time effect
        setCareer((prev) => prev + chunk.content);
      }
    } catch (err) {
      console.error("Career generation failed", err);
      setError(`Error: Could not generate the guide. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return { career, loading, error, generateCareer };
}