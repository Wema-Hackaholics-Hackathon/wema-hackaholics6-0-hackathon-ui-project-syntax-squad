"use client";

export default function Shortcuts() {
  const shortcuts = [
    { label: "Near me", bg: "conic-gradient(from 220deg, #ff6a00, #111827 60%)" },
    { label: "Buy data", bg: "linear-gradient(145deg, #0ea5e9, #1f2937)" },
    { label: "Buy airtime", bg: "linear-gradient(145deg, #7c3aed, #1f2937)" },
    { label: "Lifestyle", bg: "linear-gradient(145deg, #10b981, #1f2937)" }
  ];

  return (
    <div style={{ padding: "14px 16px 0 16px" }}>
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Shortcuts</h3>
      <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
        {shortcuts.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 86 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 20,
                background: s.bg,
                border: "1px solid #2a2f37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span style={{ fontSize: 20, opacity: 0.9 }}>◎</span>
            </div>
            <span style={{ marginTop: 8, color: "#cbd5e1", fontSize: 12 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


