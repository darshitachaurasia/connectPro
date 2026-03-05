import { ChatOpenAI } from "@langchain/openai";
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.LLM_API_KEY) {
  throw new Error("LLM_API_KEY is missing in .env");
}

const model = new ChatOpenAI({
  apiKey: process.env.LLM_API_KEY,
  modelName: "openai/gpt-oss-120b", // ⚠️ must use modelName
  temperature: 0.7,
  maxTokens: 1024,
  configuration: {
    baseURL: "https://integrate.api.nvidia.com/v1",
  },
});

export const generateCareerSuggestions = async (skills) => {
  const prompt = `
Suggest 3 career paths for someone with skills in: ${skills}.
For each path give a short reason.

Rules:
- Do not use bullet points
- Use numbered list
- Keep response concise
`;

  try {
    const response = await model.invoke(prompt);

    return response.content?.trim() || "No response generated.";
  } catch (error) {
    console.error("LLM Error:", error.response?.data || error.message);
    throw error;
  }
};