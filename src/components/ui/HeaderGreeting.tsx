"use client";
import { motion } from "framer-motion";

export default function HeaderGreeting({ scale, name }: { scale: number; name: string }) {
  return (
    <div style={{ padding: "20px 16px 8px 16px" }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            backgroundColor: "#1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#9ca3af"
          }}
        >
          •
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            transform: `scale(${scale})`,
            transition: "transform 0.5s"
          }}
        >
          {name}
        </h2>
      </motion.div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <div
          style={{
            padding: "6px 10px",
            borderRadius: 10,
            backgroundColor: "#161a21",
            border: "1px solid #2a2f37",
            color: "#cbd5e1",
            fontSize: 12
          }}
        >
          Savings
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              padding: "6px 10px",
              borderRadius: 10,
              backgroundColor: "#161a21",
              border: "1px solid #2a2f37",
              color: "#cbd5e1",
              fontSize: 12
            }}
          >
            1003•••93
          </div>
          <button
            aria-label="Copy"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: "#1f2937",
              border: "1px solid #2a2f37",
              color: "#e5e7eb",
              cursor: "pointer"
            }}
            onClick={() => navigator.clipboard.writeText("1003•••93")}
          >
            ⧉
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: "#f3f4f6" }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: "#6b7280" }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: "#6b7280" }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: "#6b7280" }} />
        </div>
        <div style={{ marginLeft: 8, color: "#9ca3af", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12 }}>Book balance</span>
          <span style={{ width: 6, height: 6, backgroundColor: "#6b7280", borderRadius: 999 }} />
          <span style={{ width: 6, height: 6, backgroundColor: "#6b7280", borderRadius: 999 }} />
          <span style={{ width: 6, height: 6, backgroundColor: "#6b7280", borderRadius: 999 }} />
        </div>
      </div>
    </div>
  );
}


