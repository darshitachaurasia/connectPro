import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../const/env.const.js";

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
        `${BASE_URL}/career-guide`,
        { career: prompt }
      );

      setCareer(response.data.guide);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not generate career guide."
      );
    } finally {
      setLoading(false);
    }
  }

  return { career, loading, error, generateCareer };
}