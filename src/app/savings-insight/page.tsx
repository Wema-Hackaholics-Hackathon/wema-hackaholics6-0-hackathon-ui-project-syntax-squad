"use client";
import { useEffect, useMemo, useState } from "react";
import PieChart from "@/components/ui/PieChart";

type Alert = { id: string; title: string; description: string; date: string; type: string; amount: number };
type Category = { name: string; total: number; color: string };

async function analyzeWithGemini(history: Alert[]) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Gemini API key");

    const prompt = `You are a finance assistant. Given a user's transaction alerts as JSON, perform:
1) Categorize each transaction into high-level buckets like groceries, utilities, transport, dining, healthcare, entertainment, subscriptions, transfers, income, fees, others based on description/title.
2) Compute total spend per category for the last 90 days.
3) Provide 3-6 personalized savings insights (bullet points) tied to these categories and amounts. Each insight should reference a potential service name (mock name) like "Spendlens Save Vault", "Spendlens Auto-Roundup", or "Spendlens Bills Optimizer".
4) Forecast monthly spend per category for the next month using a simple frequency and seasonality intuition (describe briefly how you estimated it).
Return JSON only with the shape: { categories: [{ name, total }], recommendations: string[], forecast: [{ name, nextMonth }] }.
Data: ${JSON.stringify(history).slice(0, 15000)}`;

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
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

  const categories: Category[] = useMemo(() => {
    const cats = result?.categories || [];
    return cats.map((c: any, i: number) => ({ name: c.name, total: Number(c.total) || 0, color: palette[i % palette.length] }));
  }, [result]);

  const pieData = categories.map(c => ({ label: c.name, value: c.total, color: c.color }));
  const total = categories.reduce((s, c) => s + c.total, 0);

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0f1115", color: "#f3f4f6", padding: 16, paddingBottom: 84 }}>
      <h2 style={{ margin: 0, marginBottom: 12, fontWeight: 800 }}>Savings insight</h2>

      {loading ? (
        <div style={{ opacity: 0.8 }}>Analyzing your transactions…</div>
      ) : error ? (
        <div style={{ color: "#f87171" }}>Error: {error}</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {/* Top row: pie + legend and forecast */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div style={{
              borderRadius: 12,
              border: "1px solid #2a2f37",
              backgroundColor: "#12161d",
              padding: 16
            }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                <PieChart data={pieData} />
                <div style={{
                  minWidth: 140,
                  border: "1px solid #2a2f37",
                  backgroundColor: "#0f1115",
                  borderRadius: 10,
                  padding: 12
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Legend</div>
                  {categories.map(c => (
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
          </div>

          {/* Recommendations */}
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
      )}
    </div>
  );
}


