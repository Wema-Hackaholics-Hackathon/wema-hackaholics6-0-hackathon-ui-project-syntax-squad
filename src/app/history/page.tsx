"use client";
import { useState, useEffect } from "react";
import HeaderGreeting from "@/components/ui/HeaderGreeting";
import HistoryCard from "@/components/ui/HistoryCard";

export default function HistoryPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("alerts");
    if (stored) setAlerts(JSON.parse(stored));
    const interval = setInterval(() => {
      setScale(prev => (prev === 1 ? 1.1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const populateHistory = async () => {
    const res = await fetch("/api/alerts");
    const data = await res.json();
    setAlerts(data.alerts);
    localStorage.setItem("alerts", JSON.stringify(data.alerts));
  };

  const latest = alerts.length > 0 ? alerts[0] : null;

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#0f1115", color: "#f3f4f6", paddingBottom: 84 }}>
      <HeaderGreeting scale={scale} name="History" />
      <div style={{ padding: "0 16px" }}>
        <button className="primary" onClick={populateHistory} style={{
          marginTop: 8,
          borderRadius: 12,
          background: "linear-gradient(135deg,#22c55e,#0ea5e9)",
          color: "white",
          border: 0,
          cursor: "pointer",
          fontWeight: 700,
          padding: "12px 16px"
        }}>Populate History</button>
      </div>
      <HistoryCard latest={latest} />

      {/* Full list */}
      <div style={{ padding: "12px 16px 90px 16px" }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#12161d",
            border: "1px solid #20242d",
            borderRadius: 12,
            padding: 12,
            marginTop: 8
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>{alert.title}</p>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>{alert.description}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{alert.date}</p>
            </div>
            <div style={{ fontWeight: 800, color: alert.type === "credit" ? "#10b981" : "#f43f5e" }}>
              {alert.type === "credit" ? "+" : "-"}${alert.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
