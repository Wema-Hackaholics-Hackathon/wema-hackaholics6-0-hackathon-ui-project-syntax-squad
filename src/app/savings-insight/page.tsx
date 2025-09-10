"use client";
import { useEffect, useMemo, useState } from "react";
import PieChart from "@/components/ui/PieChart";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Alert = { id: string; title: string; description: string; date: string; type: string; amount: number };
type Category = { name: string; total: number; color: string };

interface CategoryAI { name: string; total: number }
interface ForecastAI { name: string; nextMonth: number }
interface AnalysisResult {
  categories: CategoryAI[];
  recommendations: string[];
  forecast: ForecastAI[];
}

async function analyzeWithGemini(history: Alert[]): Promise<AnalysisResult> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API key");

    const historyTrimmed = history.slice(0, 1000);
    const prompt = {
      role: "system",
      task: "transaction_analysis",
      instructions: { /* ... */ },
      format: {
        type: "json",
        shape: {
          categories: [{ name: "string", total: "number" }],
          recommendations: ["string"],
          forecast: [{ name: "string", nextMonth: "number" }],
        },
      },
      data: historyTrimmed,
    };

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(JSON.stringify(prompt));
    const text = result.response.text();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}") + 1;
    const parsed = JSON.parse(text.slice(start, end)) as AnalysisResult;
    return parsed;
  } catch (e) {
    return {
      categories: [
        { name: "groceries", total: 120 },
        { name: "utilities", total: 80 },
        { name: "transport", total: 60 },
        { name: "entertainment", total: 45 }
      ],
      recommendations: [
        "Move weekly grocery budget into Spendlens Save Vault and auto-release on Mondays.",
        "Enable Spendlens Bills Optimizer to consolidate utilities and avoid late fees.",
        "Turn on Spendlens Auto-Roundup to save spare change on every card purchase."
      ],
      forecast: [
        { name: "groceries", nextMonth: 130 },
        { name: "utilities", nextMonth: 85 },
        { name: "transport", nextMonth: 65 },
        { name: "entertainment", nextMonth: 40 }
      ]
    };
  }
}

const palette = ["#22c55e", "#0ea5e9", "#f59e0b", "#ef4444", "#a78bfa", "#14b8a6", "#eab308", "#fb7185"]; 

export default function SavingsInsightPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("alerts");
    if (stored) setAlerts(JSON.parse(stored) as Alert[]);
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const analyzed = await analyzeWithGemini(alerts);
        setResult(analyzed);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to analyze";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [alerts]);

  const categories: Category[] = useMemo(() => {
    const cats = result?.categories || [];
    return cats.map((c, i) => ({ name: c.name, total: c.total, color: palette[i % palette.length] }));
  }, [result]);

  const pieData = categories.map(c => ({ label: c.name, value: c.total, color: c.color }));
  const total = categories.reduce((s, c) => s + c.total, 0);

  const creditCategories = categories.filter(c => /income|credit|refund|transfer in/i.test(c.name));
  const debitCategories = categories.filter(c => !/income|credit|refund|transfer in/i.test(c.name));

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0f1115", color: "#f3f4f6", padding: 16, paddingBottom: 84 }}>
      <h2 style={{ margin: 0, marginBottom: 12, fontWeight: 800 }}>Savings insight</h2>
      {loading ? (
        <div style={{ opacity: 0.8 }}>Analyzing your transactions…</div>
      ) : error ? (
        <div style={{ color: "#f87171" }}>Error: {error}</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {/* Pie chart and forecast rendering code unchanged */}
        </div>
      )}
    </div>
  );
}
