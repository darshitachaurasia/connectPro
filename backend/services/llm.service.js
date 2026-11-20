import { ChatOpenAI } from "@langchain/openai";
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.NVIDIA_API_KEY || process.env.LLM_API_KEY;

if (!apiKey) {
  throw new Error("NVIDIA_API_KEY or LLM_API_KEY is missing in .env");
}

const model = new ChatOpenAI({
  apiKey,
  modelName: "nvidia/nemotron-3.5-lightning-30b-a3b",
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