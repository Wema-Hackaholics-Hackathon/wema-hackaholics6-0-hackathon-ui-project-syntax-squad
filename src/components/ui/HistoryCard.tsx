"use client";
import Link from "next/link";

export default function HistoryCard({ latest }: { latest?: { title: string; description: string; date: string; type: string; amount: number } | null }) {
  return (
    <div style={{ padding: "18px 16px 0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Transaction history</h3>
        <Link href="/history" style={{ color: "#94a3b8", fontSize: 13 }}>See more ›</Link>
      </div>
      <div
        style={{
          marginTop: 12,
          borderRadius: 14,
          backgroundColor: "#12161d",
          border: "1px solid #20242d",
          padding: 16
        }}
      >
        <div style={{ color: "#94a3b8", fontSize: 13 }}>Latest transaction</div>
        {latest ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>{latest.title}</p>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>{latest.description}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{latest.date}</p>
            </div>
            <div style={{ fontWeight: 800, color: latest.type === "credit" ? "#10b981" : "#f43f5e" }}>
              {latest.type === "credit" ? "+" : "-"}${latest.amount}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, color: "#6b7280" }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, backgroundColor: "#1f2937", display: "flex", alignItems: "center", justifyContent: "center" }}>⏲</div>
            <div>No past transactions</div>
          </div>
        )}
      </div>
    </div>
  );
}


