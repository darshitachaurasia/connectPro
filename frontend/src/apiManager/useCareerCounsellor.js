import { useState } from "react";
import axios from "axios";

export function useCareerCounsellor() {
  const [career, setCareer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateCareer(prompt) {
    if (!prompt) return;

    setLoading(true);
    setCareer("");
    setError(null);

    try {
      const API = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${API}/career-guide`,
        { career: prompt }
      );

      setCareer(response.data.guide);
    } catch (err) {
      setError("Could not generate career guide.");
    } finally {
      setLoading(false);
    }
  }

  return { career, loading, error, generateCareer };
}