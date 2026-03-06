import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

import connectDB from "./config/db.js";
import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

console.log(
  "🔑 Loaded LLM_API_KEY?",
  process.env.LLM_API_KEY ? "Yes" : "No"
);

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});