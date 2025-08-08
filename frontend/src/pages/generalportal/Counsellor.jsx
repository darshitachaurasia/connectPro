import { useState } from "react";
import { Layout, Typography, Input, Button, Card, Spin, Alert } from "antd";
import { useCareerGenerator } from "../../apiManager/useCareerGenerator"
import ReactMarkdown from "react-markdown";

const { Title } = Typography;

const SUGGESTION_PROMPTS = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Cybersecurity Analyst",
];

export default function Counsellor() {
  const [prompt, setPrompt] = useState("");
  const { career, loading, error, generateCareer } = useCareerGenerator();

  const handleGenerate = (currentPrompt) => {
    if (currentPrompt.trim()) {
      generateCareer(currentPrompt);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
    handleGenerate(suggestion);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-slate-50 font-sans">
      <header className="bg-blue-600 shadow-md">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <Title level={2} className="!text-white !m-0 !font-bold">
            AI Career Counsellor
          </Title>
        </div>
      </header>

      <main className="p-4 sm:p-8">
        <Card className="mx-auto max-w-screen shadow-lg">
          <div className="flex flex-col gap-6">
            <p className="text-base text-gray-600">
              Get a concise guide on career paths, skills, salaries, and future trends.
            </p>

            {/* Input and Button Group */}
            <div className="flex w-full gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onPressEnter={() => handleGenerate(prompt)}
                placeholder="Enter a career field, e.g., 'UI/UX Designer'"
                disabled={loading}
                size="large"
              />
              <Button
                type="primary"
                onClick={() => handleGenerate(prompt)}
                loading={loading}
                size="large"
              >
                Generate
              </Button>
            </div>

            {/* Suggestion Buttons */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-sm font-medium text-gray-700">Try:</span>
              {SUGGESTION_PROMPTS.map((text) => (
                <button
                  key={text}
                  onClick={() => handleSuggestionClick(text)}
                  disabled={loading}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 transition hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Output Card */}
            <div className="min-h-[300px] rounded-lg bg-slate-100/70 p-4 sm:p-6">
              {loading && !career && (
                <div className="flex h-full items-center justify-center pt-10">
                  <Spin size="large" />
                </div>
              )}
              {error && <Alert message={error} type="error" showIcon />}
              {career && (
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown>{career}</ReactMarkdown>
                </div>
              )}
              {!loading && !career && !error && (
                <p className="pt-16 text-center text-gray-500">
                  Your career guidance will appear here.
                </p>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}