"use client";
import { useEffect, useMemo, useState } from "react";
import PieChart from "@/components/ui/PieChart";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Alert = { id: string; title: string; description: string; date: string; type: string; amount: number };
type Category = { name: string; total: number; color: string };

async function analyzeWithGemini(history: Alert[]) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API key");

    const historyTrimmed = history.slice(0, 1000);
    const prompt = {
      role: "system",
      task: "transaction_analysis",
      instructions: {
        step1:
          "Categorize each transaction into high-level buckets like groceries, utilities, transport, dining, healthcare, entertainment, subscriptions, transfers, income, fees, others based on description/title.",
        step2: "Compute total spend per category for the last 90 days.",
        step3:
          "Provide 3-6 personalized savings insights (bullet points). Each insight should reference a potential service name (mock name) like 'Spendlens Save Vault', 'Spendlens Auto-Roundup', or 'Spendlens Bills Optimizer'.",
        step4:
          "Forecast monthly spend per category for the next month using simple frequency and seasonality intuition.",
      },
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
    const parsed = JSON.parse(text.slice(start, end));
    return parsed;
  } catch (e) {
    // Fallback mock if API fails
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
  const [result, setResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("alerts");
    if (stored) {
      setAlerts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const analyzed = await analyzeWithGemini(alerts);
        setResult(analyzed);
      } catch (e: any) {
        setError(e?.message || "Failed to analyze");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [alerts]);

  // const testGemini = async () => {
  //   try {
  //     setTestLoading(true);
  //     setTestError(null);
  //     setTestResponse(null);
  //     const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  //     if (!apiKey) throw new Error("API key not found. Set NEXT_PUBLIC_GEMINI_API_KEY.");
  //     const genAI = new GoogleGenerativeAI(apiKey);
  //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //     const result = await model.generateContent("Hello Gemini! Can you confirm my API key works?");
  //     const text = result.response.text();
  //     setTestResponse(text || "No response text returned");
  //   } catch (e: any) {
  //     setTestError(e?.message || "Gemini test failed");
  //   } finally {
  //     setTestLoading(false);
  //   }
  // };

  const categories: Category[] = useMemo(() => {
    const cats = result?.categories || [];
    return cats.map((c: any, i: number) => ({ name: c.name, total: Number(c.total) || 0, color: palette[i % palette.length] }));
  }, [result]);

  const pieData = categories.map(c => ({ label: c.name, value: c.total, color: c.color }));
  const total = categories.reduce((s, c) => s + c.total, 0);

  const creditCategories = categories.filter(c => /income|credit|refund|transfer in/i.test(c.name));
  const debitCategories = categories.filter(c => !/income|credit|refund|transfer in/i.test(c.name));

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0f1115", color: "#f3f4f6", padding: 16, paddingBottom: 84 }}>
      <h2 style={{ margin: 0, marginBottom: 12, fontWeight: 800 }}>Savings insight</h2>
      {/* <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button
          onClick={testGemini}
          disabled={testLoading}
          style={{
            backgroundColor: testLoading ? "#374151" : "#2563eb",
            color: "white",
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #1f2937",
            cursor: testLoading ? "not-allowed" : "pointer",
          }}
        >
          {testLoading ? "Testing Gemini…" : "Test Gemini API"}
        </button>
        {testError && <span style={{ color: "#f87171" }}>Error: {testError}</span>}
        {testResponse && !testError && (
          <span style={{ color: "#a7f3d0" }}>{testResponse}</span>
        )}
      </div> */}

      {loading ? (
        <div style={{ opacity: 0.8 }}>Analyzing your transactions…</div>
      ) : error ? (
        <div style={{ color: "#f87171" }}>Error: {error}</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {/* Top row: pie + legend and forecast */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{
              borderRadius: 12,
              border: "1px solid #2a2f37",
              backgroundColor: "#12161d",
              padding: 16
            }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                <PieChart data={pieData} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, minWidth: 200 }}>
                  <div style={{
                    border: "1px solid #2a2f37",
                    backgroundColor: "#0f1115",
                    borderRadius: 10,
                    padding: 12
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>Debit</div>
                    {debitCategories.map(c => (
                      <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 10, height: 10, backgroundColor: c.color, borderRadius: 999 }} />
                          <span style={{ color: "#cbd5e1" }}>{c.name}</span>
                        </div>
                        <span style={{ color: "#94a3b8" }}>${c.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    border: "1px solid #2a2f37",
                    backgroundColor: "#0f1115",
                    borderRadius: 10,
                    padding: 12
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>Credit</div>
                    {creditCategories.map(c => (
                      <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 10, height: 10, backgroundColor: c.color, borderRadius: 999 }} />
                          <span style={{ color: "#cbd5e1" }}>{c.name}</span>
                        </div>
                        <span style={{ color: "#94a3b8" }}>${c.total.toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #2a2f37", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              <div style={{
                borderRadius: 12,
                border: "1px solid #2a2f37",
                backgroundColor: "#12161d",
                padding: 16
              }}>
                <h3 style={{ marginTop: 0 }}>Forecast</h3>
                <div>
                  {(result?.forecast || []).map((f: any) => (
                    <div key={f.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: "#cbd5e1" }}>{f.name}</span>
                      <span style={{ fontWeight: 700 }}>${Number(f.nextMonth || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: "#9ca3af", marginTop: 12, fontSize: 12 }}>Estimates are derived from category frequency and recent spend patterns.</p>
              </div>
              <div style={{
                borderRadius: 12,
                border: "1px solid #2a2f37",
                backgroundColor: "#12161d",
                padding: 16
              }}>
                <h3 style={{ marginTop: 0 }}>Suggested Recommendations</h3>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {(result?.recommendations || []).map((r: string, i: number) => (
                    <li key={i} style={{ marginBottom: 8, color: "#cbd5e1" }}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


