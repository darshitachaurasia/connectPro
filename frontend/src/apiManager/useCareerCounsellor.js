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
      const response = await axios.post(
        "http://localhost:4000/api/career-guide",
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