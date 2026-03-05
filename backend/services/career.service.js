import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.LLM_API_KEY) {
  throw new Error("LLM_API_KEY is missing in .env");
}

const model = new ChatOpenAI({
  apiKey: process.env.LLM_API_KEY,
  modelName: "openai/gpt-oss-120b",
  temperature: 0.6,
  maxTokens: 1500,
  configuration: {
    baseURL: "https://integrate.api.nvidia.com/v1",
  },
});

const systemPrompt = `
You are an expert career counsellor. Your goal is to provide a concise yet comprehensive career guide.
Format your response using Markdown with clear headings.
Use brief bullet points for lists. Keep the language clear and direct.

The sections must be:
1.  **Career Overview**
2.  **Key Skills**
3.  **Salary Estimates (USD)**
4.  **Industry Outlook**
5.  **Learning Resources**
`;

export const generateCareerGuide = async (careerField) => {
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Generate a career guide for: ${careerField}` },
  ];

  try {
    const response = await model.invoke(messages);
    return response.content?.trim() || "No response generated.";
  } catch (error) {
    console.error("LLM Error:", error.response?.data || error.message);
    throw error;
  }
};